# ─────────────────────────────────────────────────────────────────────
# full-deploy.ps1 — orquestación completa: git → CI → EasyPanel → verify
#
# Flujo:
#   1. git add -A + commit (pide mensaje si no se pasa)
#   2. git push origin main
#   3. Espera a que GitHub Actions termine el build de la imagen
#   4. Trigger EasyPanel deploy (Implementar)
#   5. Espera ~30s y verifica live con verify-live.mjs
#   6. Si verify falla, intenta rebuild (icono hammer en EasyPanel)
#
# Uso:
#   .\scripts\full-deploy.ps1 "fix: mensaje del commit"
#   .\scripts\full-deploy.ps1 "msg" -Rebuild   # usa hammer en vez de Implementar
#   .\scripts\full-deploy.ps1 -SkipPush        # solo trigger deploy + verify
# ─────────────────────────────────────────────────────────────────────

param(
    [Parameter(Position=0)]
    [string]$Message = "chore: deploy",
    [switch]$SkipPush,
    [switch]$Rebuild,
    [switch]$NoVerify
)

$ErrorActionPreference = 'Stop'
$repo = "C:\Users\GODSF\Herd\Hauled"
Push-Location $repo

function Step($n, $msg) { Write-Host "`n[$n] $msg" -ForegroundColor Cyan }
function OK($msg)        { Write-Host "    ✓ $msg" -ForegroundColor Green }
function Warn($msg)      { Write-Host "    ⚠ $msg" -ForegroundColor Yellow }
function Fail($msg)      { Write-Host "    ✗ $msg" -ForegroundColor Red; exit 1 }

try {
    if (-not $SkipPush) {
        Step 1 "Git add + commit + push"

        $status = git status --short 2>&1 | Out-String
        if (-not $status.Trim()) {
            Warn "No hay cambios. Saltando commit."
        } else {
            Write-Host "    Cambios:`n$status"
            git add -A 2>&1 | Out-Null
            git commit -m "$Message`n`nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>" 2>&1 | Out-Null
            OK "Commit creado"
        }

        git push origin main 2>&1 | Out-Null
        OK "Push a main hecho"

        Step 2 "Esperando build de GitHub Actions"
        $runId = (gh run list --limit 1 --json databaseId,status --jq '.[0].databaseId' 2>$null)
        if ($runId) {
            Write-Host "    Run ID: $runId"
            gh run watch $runId --exit-status 2>&1 | Select-Object -Last 5
            OK "Build de Docker terminado"
        } else {
            Warn "No se pudo obtener run ID — esperando 90s"
            Start-Sleep -Seconds 90
        }
    }

    Step 3 "Disparando deploy en EasyPanel"
    $mode = if ($Rebuild) { "--rebuild" } else { "" }
    $deployCmd = "node scripts/easypanel-deploy.cjs $mode"
    Write-Host "    $deployCmd"
    Invoke-Expression $deployCmd
    if ($LASTEXITCODE -ne 0) { Fail "Deploy de EasyPanel falló" }
    OK "Deploy disparado"

    if ($NoVerify) {
        OK "Saltando verificación (--NoVerify)"
        Pop-Location; exit 0
    }

    Step 4 "Esperando 25s para que el deploy se propague"
    Start-Sleep -Seconds 25

    Step 5 "Verificando hauled.shop"
    node scripts/verify-live.cjs
    $exit = $LASTEXITCODE
    if ($exit -eq 0) {
        OK "Deploy fresh en hauled.shop"
    } elseif ($exit -eq 2 -and -not $Rebuild) {
        Warn "Deploy stale — reintentando con --rebuild"
        node scripts/easypanel-deploy.cjs --rebuild
        Start-Sleep -Seconds 35
        node scripts/verify-live.cjs
        if ($LASTEXITCODE -eq 0) { OK "Rebuild OK" }
        else { Fail "Rebuild también falló" }
    } else {
        Fail "Verify falló con exit code $exit"
    }

} finally {
    Pop-Location
}

Write-Host "`n✅ Full deploy completado.`n" -ForegroundColor Green
