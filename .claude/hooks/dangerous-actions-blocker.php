<?php
/**
 * dangerous-actions-blocker.php — Hauled (red de seguridad para Claude Code)
 *
 * Hook PreToolUse para Bash / Edit / Write / MultiEdit.
 * Contrato: recibe JSON por stdin -> { "tool_name": "...", "tool_input": { ... } }.
 * Exit 0 = permitir. Exit 2 + mensaje a stderr = BLOQUEAR.
 *
 * Adaptado del blocker de WellCore/LIKE A PRO al dominio e-commerce de Hauled:
 *  - hauled-api usa migraciones Laravel ESTÁNDAR -> NO se bloquea toda ALTER/migrate.
 *    Sí se bloquea migrate:fresh / migrate:rollback / db:wipe APUNTANDO A PRODUCCIÓN.
 *  - Se bloquea atribución de IA en commits (info interna).
 *  - Se bloquea force-push a main, rm -rf peligrosos, supply-chain installs, editar .env.
 */

$raw = stream_get_contents(STDIN);
$payload = json_decode($raw, true) ?: [];
$tool = $payload['tool_name'] ?? '';
$input = $payload['tool_input'] ?? [];

function block(string $msg): void {
    fwrite(STDERR, "⛔ BLOQUEADO por dangerous-actions-blocker (Hauled):\n  " . $msg . "\n");
    exit(2);
}

/* ---------- Bash ---------- */
if ($tool === 'Bash') {
    $cmd = (string)($input['command'] ?? '');
    $c = strtolower($cmd);

    // rm -rf raíz / home / patrones catastróficos
    if (preg_match('#\brm\s+-[a-z]*r[a-z]*f?\b[^|;&]*\s+(/|~|\$home|\.|\*)\s*$#i', $cmd)
        || preg_match('#\brm\s+-[a-z]*f[a-z]*r[a-z]*\b[^|;&]*\s+(/|~)\b#i', $cmd)) {
        block("rm -rf peligroso sobre /, ~ o cwd.");
    }
    // fork bomb
    if (strpos($cmd, ':(){:|:&};:') !== false || preg_match('/\)\s*\{\s*:\s*\|\s*:\s*&\s*\}/', $cmd)) {
        block("fork bomb.");
    }
    // force push a main / master
    if (preg_match('/git\s+push\b.*(--force|-f)\b/i', $cmd) && preg_match('/\b(main|master|origin\s+main)\b/i', $cmd)) {
        block("git push --force a main/master. Usa una rama y PR.");
    }
    if (preg_match('/git\s+push\b.*(--force|-f)\b/i', $cmd)) {
        block("git push --force. Confirma con un humano antes de reescribir historia.");
    }
    // git reset --hard / clean -f / checkout . (descartan trabajo)
    if (preg_match('/git\s+reset\s+--hard/i', $cmd))  block("git reset --hard descarta cambios. Usa stash.");
    if (preg_match('/git\s+clean\s+-[a-z]*f/i', $cmd)) block("git clean -f borra archivos no trackeados.");
    if (preg_match('/git\s+checkout\s+\.\s*$/i', $cmd) || preg_match('/git\s+restore\s+\.\s*$/i', $cmd)) {
        block("git checkout/restore . descarta el working tree.");
    }

    // Migraciones destructivas APUNTANDO A PRODUCCIÓN (hauled-api SÍ migra en dev)
    if (preg_match('/artisan\s+(migrate:fresh|migrate:reset|migrate:rollback|db:wipe)/i', $cmd)) {
        if (preg_match('/--env[= ]*prod/i', $cmd)
            || preg_match('/(api\.hauled\.shop|hauled-mysql|DB_HOST=.*(prod|mysql))/i', $cmd)) {
            block("migración destructiva contra PRODUCCIÓN. Haz backup y confírmalo manualmente.");
        }
    }

    // Supply chain: instalar paquete suelto (no install/ci a secas)
    if (preg_match('/\bnpm\s+(install|i|add)\s+[^\s-]/i', $cmd) && !preg_match('/npm\s+(install|ci)\s*(--[a-z-]+)?\s*$/i', $cmd)) {
        block("npm install <paquete> suelto (riesgo supply-chain). Edita package.json -> npm install sin args -> revisa lockfile.");
    }
    if (preg_match('/\bcomposer\s+require\s+\S/i', $cmd)) {
        block("composer require <paquete> suelto. Edita composer.json -> composer install -> revisa el lockfile.");
    }
    if (preg_match('/\b(npm|composer)\b.*(--force|--legacy-peer-deps|--no-audit)/i', $cmd)) {
        block("flag peligroso en npm/composer (--force/--legacy-peer-deps/--no-audit). Pregunta a un humano.");
    }
    // curl|bash
    if (preg_match('/\b(curl|wget)\b[^|]*\|\s*(bash|sh)\b/i', $cmd)) {
        block("curl|bash. Descarga, lee y luego ejecuta.");
    }
    // build en el container EasyPanel (heurística: nunca buildear en prod remoto)
    // (déjalo como recordatorio; el build va por GitHub Actions)

    // Commit con atribución de IA (info interna)
    if (preg_match('/git\s+commit/i', $cmd)
        && preg_match('/(co-authored-by:\s*claude|generated with|noreply@anthropic\.com|🤖|ai-assisted|claude code)/i', $cmd)) {
        block("atribución de IA en el commit. Prohibido (la IA es info interna). Quita esas líneas del mensaje.");
    }
    exit(0);
}

/* ---------- Edit / Write / MultiEdit ---------- */
if (in_array($tool, ['Edit', 'Write', 'MultiEdit'], true)) {
    $path = (string)($input['file_path'] ?? $input['path'] ?? '');
    $p = strtolower(str_replace('\\', '/', $path));

    // Editar archivos de secretos
    if (preg_match('#(^|/)\.env(\.|$)#', $p) || preg_match('#(^|/)(credentials|secrets)[^/]*$#', $p)) {
        block("edición de archivo de secretos ($path). Edítalo a mano fuera de la sesión de IA.");
    }
    // Editar lockfiles a mano (deben generarse)
    if (preg_match('#(package-lock\.json|composer\.lock|bun\.lockb)$#', $p)) {
        block("edición manual de lockfile ($path). Se regenera con el package manager.");
    }
    // No tocar otros proyectos del dueño
    if (preg_match('#/herd/(wellcore-laravel|wellcorefitness)/#', $p)
        || preg_match('#/music/like a pro#i', $p)) {
        block("edición fuera de Hauled/hauled-api ($path). Prohibido tocar otros proyectos.");
    }
    exit(0);
}

exit(0);
