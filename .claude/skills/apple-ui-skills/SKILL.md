---
name: apple-ui-skills
description: Recreate Apple Human Interface Guidelines in web, React, and Remotion using CSS equivalents — Liquid Glass (iOS 26+), SF Pro typography, 8pt grid, safe areas, Dynamic Type, materials hierarchy, HIG motion principles, and dark mode first. Use when user wants Apple-style UI, iOS/macOS/visionOS aesthetics, keynote-quality promos, HIG-compliant components, or glass morphism effects.
when_to_use: Keywords = "apple", "ios", "ipados", "macos", "visionos", "liquid glass", "hig", "sf pro", "dynamic island", "safe area", "backdrop-filter", "apple-style", "apple keynote", "dark mode", "voiceover", "dynamic type", "seedance". Triggers on files mentioning Apple platforms or premium minimalist aesthetics.
allowed-tools: Read, Write, Edit, Bash(ffprobe:*), Glob, Grep
model: sonnet
paths: "**/*.tsx,**/*.css,remotion/**/*.tsx,**/*.html"
---

# Apple UI Skills (apple-ui-skills)

Traduce Apple HIG a web/React/Remotion. **No es nativo iOS/Swift** — es recreación 95% fiel en CSS + Remotion.

Fuentes: vabole/apple-skills, axiaoge2/apple-hig-designer, ehmo/platform-design-skills, robonuggets/seedance-skill

## Brand Tokens Activos

```json
{
  "bg": "#FFFFFF",
  "accent": "#3B82F6",
  "accent2": "#8B5CF6",
  "text": "#111827",
  "fontDisplay": "Inter",
  "fontBody": "JetBrains Mono"
}
```

## Iron Law — Apple DNA

1. **Dark mode first.** Apple designs dark-first desde iOS 13. Siempre empieza con dark, luego adapta a light.
2. **SF Pro threshold:** Display ≥20px, Text <20px. No mezclar.
3. **8pt grid siempre.** Todo múltiplo de 8px (--space-1 = 8px, --space-12 = 96px)
4. **44×44pt touch targets.** En web: 48-52px para mayor comodidad. En visionOS: 60pt mínimo (eye tracking imprecision).
5. **Concentric border-radius.** Outer = inner + padding. Ej: card outer 16px, inner padding 8px, inner elements 8px radius.
6. **Typography scale FIX** desde HIG — no inventes tamaños.

## Red Flags — STOP

| Red Flag | Fix |
|---|---|
| `font-family: Inter` para Apple style | `font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display'` |
| `font-size: 18px` | No está en HIG scale. Usa 17px (body) o 20px (title-3) |
| `backdrop-filter: blur(10px)` sin `saturate` | Falta saturación, no se ve "glass real" → `blur(20px) saturate(180%)` |
| `border-radius: 12px` en todos lados | Concentric math: outer 16, inner 8 |
| Light mode primero | Dark first! Luego `@media (prefers-color-scheme: light)` |
| Touch target 32×32 | Mínimo 44 iOS, 60 visionOS |

## Typography Scale (HIG exacta)

```css
:root {
  --text-large-title:  34px; --text-large-title-lh:  41px;
  --text-title-1:      28px; --text-title-1-lh:      34px;
  --text-title-2:      22px; --text-title-2-lh:      28px;
  --text-title-3:      20px; --text-title-3-lh:      25px;
  --text-headline:     17px; --text-headline-lh:     22px;
  --text-body:         17px; --text-body-lh:         22px;
  --text-callout:      16px; --text-callout-lh:      21px;
  --text-subheadline:  15px; --text-subheadline-lh:  20px;
  --text-footnote:     13px; --text-footnote-lh:     18px;
  --text-caption-1:    12px; --text-caption-1-lh:    16px;

  --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
  --font-text:    -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
  --font-mono:    'SF Mono', Menlo, Monaco, Consolas, monospace;
}
```

**Weights (HIG oficial):** Light 300, Regular 400, Medium 500, Semibold 600, Bold 700.

**Letter spacing (tracking)** HIG usa valores negativos para display:
- Large Title: `-0.4`
- Title 1: `-0.3`
- Title 2: `-0.26`
- Title 3: `-0.2`
- Headline / Body: `-0.17`
- Smaller: normal

## Colors (Semantic + Dark Mode automático)

```css
:root {
  /* System Colors */
  --system-blue:   #007AFF; --system-red:    #FF3B30;
  --system-green:  #34C759; --system-orange: #FF9500;
  --system-yellow: #FFCC00; --system-pink:   #FF2D55;
  --system-purple: #AF52DE; --system-teal:   #5AC8FA;
  --system-indigo: #5856D6; --system-gray:   #8E8E93;

  /* Label Colors (text) */
  --label-primary:     rgba(0, 0, 0, 1);
  --label-secondary:   rgba(60, 60, 67, 0.6);
  --label-tertiary:    rgba(60, 60, 67, 0.3);
  --label-quaternary:  rgba(60, 60, 67, 0.18);

  /* Fill Colors (backgrounds) */
  --system-fill:          rgba(120, 120, 128, 0.2);
  --secondary-fill:       rgba(120, 120, 128, 0.16);
  --tertiary-fill:        rgba(118, 118, 128, 0.12);

  /* Background */
  --bg-primary:       #FFFFFF;
  --bg-secondary:     #F2F2F7;
  --bg-tertiary:      #FFFFFF;
  --bg-grouped:       #F2F2F7;
}

@media (prefers-color-scheme: dark) {
  :root {
    --system-blue:   #0A84FF; --system-red:    #FF453A;
    --system-green:  #30D158; --system-orange: #FF9F0A;
    --label-primary:     rgba(255, 255, 255, 1);
    --label-secondary:   rgba(235, 235, 245, 0.6);
    --label-tertiary:    rgba(235, 235, 245, 0.3);
    --label-quaternary:  rgba(235, 235, 245, 0.18);
    --bg-primary:       #000000;
    --bg-secondary:     #1C1C1E;
    --bg-tertiary:      #2C2C2E;
    --bg-grouped:       #000000;
  }
}
```

## Liquid Glass (iOS 26+ signature)

### Variante `.regular` (nav bars, controles, cards)

```css
.liquid-glass-regular {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
}

@media (prefers-color-scheme: dark) {
  .liquid-glass-regular {
    background: rgba(40, 40, 40, 0.4);
    border-color: rgba(255, 255, 255, 0.08);
  }
}
```

### Variante `.clear` (sobre media/foto)

```css
.liquid-glass-clear {
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Interactive (con tint + press animation)

```css
.liquid-glass-interactive {
  backdrop-filter: blur(20px) saturate(180%);
  background: linear-gradient(135deg,
    rgba(var(--accent-rgb), 0.15),
    rgba(var(--accent-rgb), 0.05)
  );
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}
.liquid-glass-interactive:active {
  transform: scale(0.97);
}
```

## Materials Hierarchy (4 tipos HIG)

| Material | Blur | Opacity | Border | Use case |
|----------|------|---------|--------|----------|
| Ultra-Thin | 8px | 0.5 | 1px rgba 0.15 | Toasts, quick overlays |
| Thin | 12px | 0.65 | 1px rgba 0.12 | Tooltips, popovers |
| Regular | 16px | 0.8 | 1px rgba 0.18 | Cards, sheets, nav bars |
| Thick | 24px | 0.95 | 1px rgba 0.22 | Modals, important containers |

## Safe Areas (para Remotion + PWA)

```css
.safe-container {
  padding-top:    env(safe-area-inset-top,    0px);
  padding-right:  env(safe-area-inset-right,  0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left:   env(safe-area-inset-left,   0px);
}
```

En Remotion (1080×1920 story):
- Top safe: 180px (área de status bar + reserva)
- Bottom safe: 220px (home indicator + reserva)
- Sides: 60px para comodidad visual

## visionOS Patterns Adaptables

De `ehmo/platform-design-skills`:

| Rule | Concepto | Web equivalent |
|---|---|---|
| SL-01 | Center in FOV | Hero center-aligned |
| SL-05 | Z-depth hierarchy | CSS `z-index` + elevation shadows |
| EH-02 | 60pt targets | 60px min buttons |
| EH-03 | Hover = gaze feedback | `:hover` + `:focus-visible` siempre |
| WN-01 | Glass adapts bg | `backdrop-filter` dinámico |
| MD-02 | Depth via texture | Subtle noise en backgrounds |
| IS-02 | Progressive immersion | `transition: opacity 0.3s` |

## Motion HIG (standard easing)

```css
:root {
  --ease-apple-standard: cubic-bezier(0.25, 0.1, 0.25, 1.0);
  --ease-apple-smooth:   cubic-bezier(0.42, 0, 0.58, 1);
  --ease-apple-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-apple-decelerate: cubic-bezier(0, 0, 0.58, 1);
  --ease-apple-accelerate: cubic-bezier(0.42, 0, 1, 1);

  --duration-apple-fast:    150ms;
  --duration-apple-default: 300ms;
  --duration-apple-modal:   400ms;
}
```

Rules:
- Modal enter: 350ms `--ease-apple-spring`
- Sheet slide-up: 500ms `--ease-apple-standard`
- Button press: 150ms `--ease-apple-standard`
- Respetar `prefers-reduced-motion`

## Seedance Integration (Fal AI para promo videos)

Para generar promo videos estilo Apple Keynote, usa Seedance 2.0 via Fal API.

### Prompt Template (liquid glass signature)

```
Design a motion-graphics style ad using glossy liquid glass design language.
Pure black background. @Image1 is [describe content]. @Image2 is [describe].
The UI elements become translucent glass with reflections and refractions.
Multiple camera angles: close-up on glass reflections, pull back to reveal.
No text, no logos, no words.
Style: liquid glass morphism, Apple Vision Pro aesthetic, premium 3D depth,
self-luminous forms on absolute black, [ACCENT_COLOR] accent lighting.
```

**Params óptimos (testeados):**
- Resolution: 720p Pro
- Duration: 4-10s
- References: 3-5 imágenes óptimo
- Costo: ~$0.30/seg Pro, $0.24/seg Fast

**Reglas CRÍTICAS:**
- NUNCA describir logos/texto en prompt — pasa logo como `@Image`
- Siempre "Pure black background"
- Siempre "No text, no logos, no words"
- Máximo ~200 palabras
- Siempre terminar con "Style: liquid glass morphism, ..., [color] accent lighting"

Logo/texto se overlayea EN POST-PRODUCCIÓN (Premiere/After Effects).

## ZION-specific Remotion

Para crear escenas Apple-style en Remotion:

```tsx
import { AbsoluteFill } from 'remotion';
import { liquidGlassStyle, hig } from './apple-helpers';

export const AppleKeynoteScene: React.FC = () => (
  <AbsoluteFill style={{
    background: hig.darkMode.bgPrimary, // #000
    fontFamily: hig.fonts.display,
  }}>
    <div style={{
      ...liquidGlassStyle('regular'),
      padding: hig.spacing.m, // 16px
      borderRadius: hig.radius.card, // 16
      maxWidth: 840,
      margin: '0 auto',
      marginTop: hig.safeTop, // 180
    }}>
      <h1 style={{
        fontSize: hig.text.largeTitle, // 34
        letterSpacing: hig.tracking.largeTitle, // -0.4
        fontWeight: 700,
      }}>
        One more thing.
      </h1>
    </div>
  </AbsoluteFill>
);
```

## Workflow

1. **Identificar device target** (iPhone / iPad / Mac / Vision Pro)
2. **Apply 8pt grid + typography scale** desde HIG
3. **Dark mode first**, luego light
4. **Choose material** (ultra-thin / thin / regular / thick)
5. **Motion con HIG easing** (--ease-apple-standard por default)
6. **Validate con HIG checklist** (`references/hig-checklist.md`)
7. **Si es promo video**: usa Seedance prompt template
8. **Si es Remotion**: importa helpers desde `apple-helpers.tsx`

## References

- `references/hig-to-css.md` — tabla 30+ mappings
- `references/liquid-glass-recipes.md` — 6 variantes CSS
- `references/seedance-prompts.md` — templates Fal AI
- `references/hig-checklist.md` — 25 items compliance
- `references/apple-color-system.md` — paleta completa light + dark

## Templates

- `templates/keynote-slide.tsx` — slide style Apple keynote (Remotion)
- `templates/liquid-glass-card.tsx` — card con glass variants
- `templates/ios-tab-bar.tsx` — bottom tab bar
- `templates/apple-hero.tsx` — hero section estilo apple.com

## Integración con otros skills

- Para motion transitions dentro del skill → **`motion-designer`**
- Para SVG icons con feTurbulence → **`svg-animation-engineer`**
- Para promo videos Apple Keynote → **`video-motion-graphics`** + Seedance
- Para logo reveal dramático (>2s) → **`dramatic-2000ms-plus`**

## Eval Prompts

- `keynote-slide.md` — recrear slide Apple keynote
- `liquid-glass-card.md` — card glass en dark mode
- `typography-scale.md` — aplicar full HIG typography
- `visionos-spatial.md` — adaptar pattern visionOS a web
- `seedance-prompt.md` — generar prompt liquid glass

## Sub-Agents

- `agents/hig-auditor.md` — valida compliance HIG
- `agents/liquid-glass-reviewer.md` — revisa recetas glass
- `agents/analyzer.md` / `comparator.md` / `grader.md` — shared
