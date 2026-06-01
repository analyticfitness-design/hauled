# Inventario de configuración Claude Code — Hauled (frontend)

> Se auto-carga vía `@.claude/docs/agents.md` desde `CLAUDE.md`. Actualizado 2026-06-01 (entrega 2, identidad cyan).
> **Identidad de marca:** **Cyan eléctrico `#4CC9F0`** + **Raleway** (display) + **Inter** (cuerpo) + **Space Mono** (sellos "Cargo Tag"). Títulos en **MAYÚSCULAS + tracking**. Nivel de ejecución Gymshark, sello propio (firma Cargo Tag / `USA → CO` por los encargos). Fuente de verdad visual: `bots-especializados/DIRECTOR-VISUAL-HAULED.md` + `app/assets/scss/_tokens.scss`.

## Agentes (`.claude/agents/` · 24)
**Frontend / e-commerce:** `nuxt-frontend` · `scss-bootstrap-ds` · `ecommerce-ux` · `seo-growth` · `wompi-checkout-frontend`
**Diseño / visual:** `hauled-design-tokens-architect` · `hauled-design-system-reconciler` · `hauled-design-reviewer` · `claude-design-prompt-architect` · `hauled-ux-ia-director` · `hauled-motion` · `a11y-axe-core-runner` · `mcp-chrome-pixel-perfect` · `hauled-visual-regression-guardian` · `tokens-canonical-compliance`
**Contenido / marca:** `hauled-brand-voice-guardian` · `hauled-ig-strategy` · `hauled-content-marketing`
**Revisión / soporte:** `code-reviewer` · `architecture-reviewer` · `security-reviewer` · `planner` · `build-error-resolver` · `e2e-runner`

## Skills (`.claude/skills/`)
- `hauled-voice` — voz "Moda que Habla" (tuteo CO, honesta, cero voseo/marketing-humo).

## Directores / gobernanza (`bots-especializados/` · 12)
`00-DIRECTOR-ORQUESTA-HAULED` · `PATRONES-SUB-AGENTS` · `05-LENGUAJE-Y-VOZ-HAULED` · `DIRECTOR-VISUAL-HAULED` · `director-agents` · `director-skills`
`architecture/`: `08-DIRECTOR-QA-TESTING` · `09-DIRECTOR-RELEASE-PIPELINE` · `18-DIRECTOR-IMPLEMENTACION` · `21-DIRECTOR-PERFORMANCE-WEB` · `08`/`09` direcciones (visual `08-DIRECCION-VISUAL-GYMSHARK` y técnica `09-DIRECCION-TECNOLOGICA` si se copiaron).

## Comandos (`.claude/commands/`)
- `/commit` · `/ship`

## Hooks (`.claude/hooks/`)
- `dangerous-actions-blocker.php` — activo (PreToolUse Bash/Edit/Write/MultiEdit).

## Componentes de muestra instalados (`app/components/hauled/` · nivel Gymshark, identidad cyan)
> Disponibles para usar (no se renderizan hasta que una página los invoque):
- `HauledHeader.vue` · `HauledHero.vue` · `ProductCard.vue` (→ `<HauledProductCard>`) · `HauledBadge.vue` (cargo-tag) · `HauledCartDrawer.vue`
- Composable: `app/composables/useReveal.ts` (IntersectionObserver → clase `.is-in` para el motion).
- Motion: `app/assets/scss/theme/_motion.scss` (M01 snap reveal, M03 scroll raise; cableado en `theme/index.scss`).
- Tokens extendidos `--hauled-*` (cyan/Raleway) en `app/assets/scss/_tokens.scss`.

## Referencia (NO en uso directo)
- `_design-samples/_theme.gymshark-sample.scss` — puente Bootstrap de muestra (NO reemplaza el `_theme.scss` vivo de Shofy).
- `_design-samples/preview.html` — preview estático del diseño de muestra.

> Para tareas de **backend** (Laravel), trabajar en `../hauled-api` (tiene su propio roster).
> Backup pre-entrega-2: `C:/Users/GODSF/Downloads/BACKUP-pre-entrega2-2026-06-01/`.
