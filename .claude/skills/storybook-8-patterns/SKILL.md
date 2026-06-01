---
name: storybook-8-patterns
description: Patterns canonical para Storybook 8 en LAP Studio. Cubre story definition · args + argTypes · controls · play function (interaction testing) · visual regression Chromatic · MDX docs · decorators · CSF3 format · accessibility addon. Invocar cuando se crea componente nuevo en library · se setup visual regression · se documenta API surface componente.
whenToUse: Crear story para componente nuevo · setup Chromatic visual regression · documentar API surface · play function para interaction testing
allowedTools: [Read, Grep, Glob, Bash, Edit, Write]
model: sonnet
---

# Storybook 8 Patterns · skill LAP · v1.0

## Cuándo se invoca

- Crear story para componente nuevo (LapButton · LapInput · LapModal · etc.)
- Setup Chromatic visual regression
- Documentar API surface componente
- Play function para interaction testing (React Testing Library inside Storybook)
- Migration Storybook 7 → 8 · CSF3 format
- Daniel pide "stories para X componente"

## Spec canonical

- **Storybook 8 docs** · storybook.js.org/docs
- **CSF3** Component Story Format 3 · canonical en 8
- **@storybook/test** · Vitest-compatible testing inside stories
- **Chromatic** · visual regression cloud (paid · alternativa local axe + manual)

## Stack canonical LAP

```
@storybook/react@8.x
@storybook/test@8.x
@storybook/addon-essentials@8.x
@storybook/addon-a11y@8.x
@storybook/addon-interactions@8.x
@storybook/manager-api@8.x
@vitejs/plugin-react@4.x        # Storybook 8 usa Vite builder
chromatic@10.x                   # visual regression
```

## Story canonical (CSF3)

```typescript
// packages/studio/src/components/button/LapButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { LapButton } from './LapButton';
import { fn, expect, userEvent, within } from '@storybook/test';

// 1. Meta · default config para todas las stories del archivo
const meta: Meta<typeof LapButton> = {
  title: 'Components/Button/LapButton',
  component: LapButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'CTA primario LAP · 4 variants × 3 sizes × 6 estados',
      },
    },
  },
  tags: ['autodocs'],          // Storybook genera Docs page auto
  args: {
    children: 'Click me',
    onClick: fn(),              // mock spy
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual variant del botón',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof LapButton>;

// 2. Default story
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

// 3. Variants
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Destructive: Story = { args: { variant: 'destructive' } };

// 4. Sizes
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

// 5. States
export const Hover: Story = {
  args: { variant: 'primary' },
  parameters: { pseudo: { hover: true } },  // @storybook/addon-pseudo-states
};
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };

// 6. Play function · interaction testing
export const ClickInteraction: Story = {
  args: { variant: 'primary' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    // Click + verify onClick fired
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledOnce();

    // Verify focus visible
    expect(button).toHaveFocus();
  },
};

// 7. All variants grid · ver TODO de un vistazo
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {(['primary', 'secondary', 'ghost', 'destructive'] as const).map(variant =>
        (['sm', 'md', 'lg'] as const).map(size => (
          <LapButton key={`${variant}-${size}`} variant={variant} size={size}>
            {variant} {size}
          </LapButton>
        ))
      ).flat()}
    </div>
  ),
};
```

## Decorators · setup global

```typescript
// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import { BrandProvider } from '../packages/studio/src/brand/BrandContext';
import '../packages/studio/src/styles/studio.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'lap-dark',
      values: [
        { name: 'lap-dark', value: '#050505' },     // LAP bg canonical
        { name: 'lap-elevated', value: '#0A0A0A' },
        { name: 'wellcore-content', value: '#09090B' },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  decorators: [
    // Brand provider wraps all stories
    (Story, context) => (
      <BrandProvider initialBrand={context.parameters.brand || 'lap'}>
        <Story />
      </BrandProvider>
    ),
  ],
  // Tags global
  tags: ['autodocs'],
};
export default preview;
```

## A11y addon · WCAG 2.2 AA validation

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../packages/studio/src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',           // axe-core integration
    '@storybook/addon-interactions',
    '@storybook/addon-themes',          // brand switching
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  typescript: { check: true, reactDocgen: 'react-docgen-typescript' },
};
export default config;
```

Stories que no pasan a11y test fallan en CI · cross-ref `wcag-22-aa-audit` skill.

## Chromatic visual regression

```bash
# Install
bun add -D chromatic

# Run · publica build a Chromatic cloud
bunx chromatic --project-token=$CHROMATIC_TOKEN

# CI integration en .github/workflows/chromatic.yml
- uses: chromaui/action@v1
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    onlyChanged: true                  # solo stories que cambian
    exitZeroOnChanges: false           # fail PR si visual diff sin approve
```

## Story patterns por tipo de componente

### Componente puro (LapButton · LapBadge · LapInput)

- Default + Variants + Sizes + States
- AllVariants grid story
- Play function para interaction

### Composite (LapModal · LapDropdown · LapDialog)

- Default isOpen=true
- Triggering story (button click opens modal)
- Edge cases · empty state · overflow · long text

### Layout (LapTabs · LapSidebar · LapToolbar)

- Default con N tabs/items
- Empty state
- Many items overflow
- Responsive viewport sizes (parameters.viewport)

### Hooks-driven (useCommand · useMotion · useT)

- Skip · usar Storybook test runner para hooks · NO stories visuales

## Docs MDX (optional · enriquecer autodocs)

```mdx
{/* packages/studio/src/components/button/LapButton.mdx */}
import { Meta, Title, Description, Stories } from '@storybook/blocks';
import * as LapButtonStories from './LapButton.stories';

<Meta of={LapButtonStories} />

<Title />

<Description />

## Cuándo usar este componente

- CTA primario · acción principal de la pantalla
- Modales · acciones secundarias y destructivas

## Anatomía

```
.lap-button (variant + size)
  ├─ .lap-button__icon (opcional)
  └─ .lap-button__label
```

## Accessibility

- Semántico `<button>` (NO `<div onClick>`)
- `aria-label` si icon-only
- Focus visible · outline 2px accent
- `disabled` attribute (NO solo CSS)

<Stories />
```

## Reglas no-negociables

1. **NUNCA story sin args + argTypes** · controls obligatorios
2. **NUNCA componente nuevo sin al menos 1 story** · gate de merge
3. **NUNCA play function sin @storybook/test imports**
4. **SIEMPRE BrandProvider en preview decorators** · stories ven brand context
5. **SIEMPRE a11y addon habilitado** · CI gate
6. **SIEMPRE Chromatic en CI** para merge a like-a-pro-fork (cuando setup ready)
7. **SIEMPRE AllVariants story para componente con 4+ variants**
8. **CSF3 format** · NO CSF2 deprecated

## Performance · stories grandes

```typescript
// Lazy load story si componente pesado
export const HeavyTimelineStory: Story = {
  render: () => {
    const Timeline = lazy(() => import('./Timeline'));
    return (
      <Suspense fallback={<Skeleton />}>
        <Timeline clips={MOCK_CLIPS_100} />
      </Suspense>
    );
  },
};
```

## Common pitfalls

| Pitfall | Solución |
|---|---|
| Story renderea sin tokens CSS | Import `studio.css` en preview |
| Brand context undefined en story | BrandProvider decorator global |
| Play function timing flaky | `await userEvent.click(...)` · NO sync |
| Stories no aparecen en sidebar | Verificar pattern en `main.ts` stories array |
| Chromatic snapshots ruidoso | `parameters.chromatic.delay` para animations settle |
| `args` con functions en MDX | `fn()` de @storybook/test |
| TypeScript no infiere `args` | `Meta<typeof Component>` + `StoryObj<typeof Component>` |
| Autodocs no genera prop table | `tags: ['autodocs']` en meta · `reactDocgen` config |

## Comandos canonical

```bash
# Dev mode · localhost:6006
bunx storybook dev

# Build static
bunx storybook build       # output a storybook-static/

# Test runner · vitest-compatible interaction tests
bunx test-storybook

# Chromatic publish
bunx chromatic --project-token=$TOKEN

# Composable Stories · reuse stories en vitest tests
import { composeStories } from '@storybook/react';
import * as stories from './LapButton.stories';
const { Default, Primary } = composeStories(stories);
```

## Referencias canonical

- **Storybook 8 docs** · storybook.js.org/docs
- **CSF3 spec** · storybook.js.org/docs/api/csf
- **Chromatic docs** · chromatic.com/docs/
- **Component Driven Development** · componentdriven.org
- **@storybook/test** · github.com/storybookjs/storybook/tree/main/code/addons/test

## Internas LAP

- 18-DIRECTOR-IMPLEMENTACION · custodia component library implementación
- 07-DIRECTOR-VISUAL-STUDIO · valida visual consistency entre stories
- 08-DIRECTOR-QA-TESTING · usa play functions como E2E lite
- 17-COMPONENTS-MODALS-CHECKLIST v2 · 11 componentes con stories obligatorias
- v6 Edición HTML cap [O] · Component Library explode-view

## Cierre

```
— storybook-8-patterns v1.0 · YYYY-MM-DD
Aplica a · packages/studio/src/<area>/<Component>.stories.tsx
Cross-ref · 18-DIRECTOR-IMPLEMENTACION · 07-DIRECTOR-VISUAL-STUDIO · 17-COMPONENTS-CHECKLIST
```
