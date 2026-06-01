---
name: wcag-22-aa-audit
description: Audit framework canonical para WCAG 2.2 AA compliance en componentes del Studio LAP. Cubre contrast ratios calculados · ARIA labels · keyboard trap detection · focus order · screen reader hints · color-only-info prevention · touch targets ≥44×44px. Output · report con findings por componente + remediation steps. Invocar cuando un PR introduce componente nuevo o cuando se prepara audit completo del Studio antes de release.
whenToUse: Antes de merge de componente nuevo · pre-release audit · si Sentry reporta complaint a11y · si user con screen reader contacta soporte
allowedTools: [Read, Grep, Glob, Bash]
model: sonnet
---

# WCAG 2.2 AA Audit · skill LAP · v1.0

## Cuándo se invoca

- Antes de merge de componente nuevo a `like-a-pro-fork`
- Pre-release audit completo del Studio · gate de v1.x.y
- Sentry reporta complaint accessibility de user
- User con screen reader (VoiceOver · NVDA · JAWS) contacta soporte
- Lighthouse a11y score baja de >95 target
- Daniel pide "auditá a11y de X"

## Standards canonical

- **WCAG 2.2** Level AA · spec W3C 2023
- **WAI-ARIA Authoring Practices** 1.2 · patterns canonical
- **Apple HIG Accessibility** · iOS/macOS conventions
- **Material 3 Accessibility** · Android conventions
- **axe-core** rules · Deque · industry standard

## Pipeline de audit · 5 fases

### FASE 1 · CONTRAST RATIOS (visual)

Para cada combinación foreground/background en el componente · calcular ratio ·

```
ratio = (L1 + 0.05) / (L2 + 0.05)
donde L = luminancia relativa (formula WCAG)
```

Targets WCAG 2.2 AA ·
- **Texto normal** (<18px regular · <14px bold) · ratio ≥ 4.5:1
- **Texto grande** (≥18px regular · ≥14px bold) · ratio ≥ 3:1
- **UI components + graphical objects** · ratio ≥ 3:1 (Success Criterion 1.4.11)
- **Estados focus** · ratio ≥ 3:1 contra fondo adyacente

Tabla canonical LAP ·

| Combinación | Ratio | WCAG 2.2 AA |
|---|---|---|
| `--lap-text-1` (`#FAFAFA`) sobre `--lap-bg` (`#050505`) | 19.5:1 | ✓✓ AAA |
| `--lap-text-2` (`#C0C0C0`) sobre `--lap-bg` | 11.2:1 | ✓✓ AAA |
| `--lap-text-3` (`#8A8A8A`) sobre `--lap-bg` | 5.8:1 | ✓ AA |
| `--lap-text-4` (`#5A5A5A`) sobre `--lap-bg` | 3.1:1 | ✓ AA (graphical only) |
| `--lap-text-5` (`#3A3A3A`) sobre `--lap-bg` | 1.6:1 | ✗ NO usar para texto |
| `--lap-accent` (`#FF3D2E`) sobre `--lap-bg` | 5.4:1 | ✓ AA |
| `--lap-text-1` sobre `--lap-accent` | 3.6:1 | ✓ AA (texto grande only) |

### FASE 2 · ARIA LABELS + ROLES

Para cada componente interactivo · validar ·

```typescript
// CHECK · cada elemento clickeable tiene aria-label o aria-labelledby
const interactives = document.querySelectorAll('button, [role="button"], a, input, select, textarea, [tabindex]');
interactives.forEach(el => {
  const hasLabel = el.hasAttribute('aria-label') ||
                   el.hasAttribute('aria-labelledby') ||
                   el.textContent.trim().length > 0;
  if (!hasLabel) console.warn('MISSING LABEL', el);
});

// CHECK · roles ARIA canonical por componente
// button → role="button" (implicit en <button>)
// dialog → role="dialog" + aria-modal="true" + aria-labelledby
// menu → role="menu" + role="menuitem" hijos
// tab → role="tablist" + role="tab" + role="tabpanel"
// tooltip → role="tooltip" + aria-describedby en target
```

### FASE 3 · KEYBOARD TRAP DETECTION

Validar ·
- `Tab` order respeta document order (excepto en modales con focus trap explícito)
- `Esc` cierra modales · drawers · popovers
- `Enter`/`Space` activan botones
- Arrow keys navegan dentro de listas/menús
- `Shift+Tab` revierte focus order
- Focus visible en cada estado (cero `outline: none` sin reemplazo)

Components con focus trap obligatorio · `LapModal` · `LapBottomSheet` · `LapDropdown` (cuando abierto).

```typescript
// Pattern focus trap (Radix UI o React Aria pattern)
useFocusTrap(modalRef, { isOpen, returnFocusOnUnmount: true });
```

### FASE 4 · COLOR-ONLY INFO PREVENTION

Si información se comunica SOLO por color · falla WCAG 2.2 SC 1.4.1.

```typescript
// ❌ MAL · solo color
<span style={{ color: 'red' }}>Error</span>

// ✓ BIEN · color + icon + text label
<span className="lap-error">
  <svg className="lap-icon"><use href="#i-warning"/></svg>
  Error · campo requerido
</span>
```

Check por componente ·
- Validation errors · icon + text + color
- Status indicators · dot + label + color
- Required fields · `*` + aria-required="true" + color
- Charts/graphs · patterns + labels + color

### FASE 5 · TOUCH TARGETS (mobile)

Cross-ref · 15-MOBILE-PARITY-RULES · LEY ≥44×44px (Apple HIG).

```css
/* Pattern canonical · 15-MOBILE-PARITY */
.lap-icon-button-mobile {
  min-width: 44px;
  min-height: 44px;
  padding: calc((44px - var(--icon-size)) / 2);
}

@media (min-width: 1024px) {
  /* Desktop puede ser menor · precision mouse */
  .lap-icon-button-mobile { min-width: auto; min-height: auto; }
}
```

## Tools automatizables

### axe-core en CI

```yaml
# .github/workflows/a11y.yml
- run: bunx playwright test e2e/a11y.spec.ts
# e2e/a11y.spec.ts ejecuta axe en cada ruta crítica
```

```typescript
// e2e/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Edición HTML · WCAG 2.2 AA', async ({ page }) => {
  await page.goto('http://localhost:5190');
  await page.click('[data-tab="edicion-html"]');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

### Lighthouse a11y (landing público)

```bash
bunx lhci autorun --collect.url=https://lap.studio --assert.preset=lighthouse:recommended
# Target a11y score · >95
```

### Manual screen reader testing

- **macOS** · VoiceOver (Cmd+F5)
- **Windows** · NVDA (free) o JAWS (commercial)
- **Linux** · Orca

Test scenarios canonical ·
1. Abrir Studio · primer feedback verbal coherente
2. Navegar tabs con Tab key · order document-source
3. Activar feature de Inspector · feedback verbal por cada interacción
4. Modal abre · focus trap funciona · Esc cierra · focus vuelve al trigger

## Report template (output)

```markdown
# WCAG 2.2 AA Audit · <Componente | Tab | Studio entero> · YYYY-MM-DD

## Score global
- Lighthouse a11y · X/100 (target >95)
- axe-core violations · N (target 0)
- Manual screen reader · pass/fail

## Findings por categoría

### CRÍTICOS (1.X violations · usuarios con disabilities afectados)
- [SC 1.4.3] Texto `<small>` en footer · ratio 2.1:1 · NO cumple AA 4.5:1
  - Path · packages/studio/src/components/Footer.tsx:42
  - Fix · cambiar color de `var(--lap-text-5)` a `var(--lap-text-3)`

### ALTOS (2.X violations · UX degradado)
- [SC 2.4.7] Botón "Cancel" sin focus visible
  - Path · packages/studio/src/components/button/LapButton.tsx:88
  - Fix · agregar `&:focus-visible { outline: 2px solid var(--lap-accent); }`

### MEDIOS (3.X · convention violation)
- ARIA label faltante en icon-only button
  - ...

### BAJOS (4.X · enhancement)
- Sugerencia · skip-to-content link en landing público

## Plan remediation
1. <fix CRÍTICO 1>
2. <fix CRÍTICO 2>
...

## Re-test schedule
- Post-fix · re-correr audit
- Schedule · trimestral audit completo del Studio
```

## Reglas no-negociables

1. **NUNCA `outline: none` sin reemplazo** · focus visible siempre
2. **NUNCA información SOLO por color** · siempre + icon/text/pattern
3. **NUNCA texto sobre fondo con ratio <4.5:1** (excepto texto grande ≥18px → 3:1)
4. **NUNCA componente interactivo sin label accesible** · aria-label o text content
5. **SIEMPRE focus trap en modales/drawers**
6. **SIEMPRE touch targets ≥44×44 en mobile** (regla 15-MOBILE-PARITY)
7. **SIEMPRE skip-to-content link en landing público**
8. **SIEMPRE `prefers-reduced-motion` fallback en animaciones**

## Patterns canonical por componente

### LapButton
- `<button>` semántico (NO `<div onClick>`)
- `aria-label` si icon-only · text content si tiene label
- Focus visible · `outline: 2px solid var(--lap-accent)`
- `aria-busy="true"` durante loading
- `disabled` attribute (NO solo CSS opacity)

### LapModal
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (title id)
- Focus trap activo cuando isOpen
- Esc cierra · return focus al trigger
- Backdrop tiene `aria-hidden="true"` (decorativo)

### LapDropdown
- Trigger · `<button>` con `aria-haspopup="menu"` + `aria-expanded`
- Menu · `role="menu"` + items `role="menuitem"`
- Arrow keys navegan · Enter activa · Esc cierra · Tab cierra y avanza focus

### LapTabs
- Container · `role="tablist"` + `aria-label`
- Tabs · `role="tab"` + `aria-selected` + `tabindex={isActive ? 0 : -1}`
- Panels · `role="tabpanel"` + `aria-labelledby={tabId}`
- Arrow keys navegan entre tabs · Home/End extremos

### LapInput
- `<label>` asociado · `htmlFor={inputId}`
- Error message · `aria-describedby={errorId}` + `aria-invalid="true"`
- Required · `aria-required="true"` + visual indicator
- Placeholder NO sustituye label (NO usar como label única)

## Referencias canonical

- **WCAG 2.2** spec · w3.org/TR/WCAG22/
- **WAI-ARIA Authoring Practices 1.2** · w3.org/WAI/ARIA/apg/
- **Apple HIG Accessibility** · developer.apple.com/accessibility
- **MDN Accessibility** · developer.mozilla.org/en-US/docs/Web/Accessibility
- **axe-core rules** · github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
- **Inclusive Components** (Heydon Pickering) · libro patterns canonical

## Internas LAP

- LAP Decreto Visual v2.0 §12 Accessibility (60+ líneas)
- 15-MOBILE-PARITY-RULES v2 · touch targets + safe areas
- 17-COMPONENTS-MODALS-CHECKLIST v2 · ARIA labels obligatorios
- v6 Edición HTML cap [S] · A11y + i18n compliance pro

## Cierre del audit

```
— wcag-22-aa-audit v1.0 · YYYY-MM-DD
Score · X/100 Lighthouse · N violations axe-core
Próximo audit · post-fix o trimestral
Reportar al · 07-DIRECTOR-VISUAL-STUDIO (tokens) · 18-DIRECTOR-IMPLEMENTACION (TSX fixes)
```
