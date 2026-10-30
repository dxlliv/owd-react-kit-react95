# @owdproject/react-kit-react95

[React95](https://react95.io) (`@react95/core` v10) integration kit for **Open Web Desktop** React themes.

It glues the [React95](https://github.com/React95/React95) Windows 95 component library to the headless
[`@owdproject/core`](https://github.com/owdproject/core) engine, so a React theme gets
authentic Win95 chrome without re-implementing every widget.

## What it provides

- **Re-exports of React95** (`Frame`, `Button`, `List`, `TitleBar`, `Input`, `TextArea`, …) and the
  `contract` / `tokens` theme objects — named re-exports, tree-shakeable.
- **`React95Provider`** — bootstraps React95's `GlobalStyle` and the `win95` design tokens
  (`--r95-*`). The CSS is imported as a side effect of importing this package.
- **`OwdWindow`** — Windows 95 window chrome. React95 v10 ships `TitleBar` (with built-in
  minimize/maximize/restore/close options) but **no `Window` component**, so `OwdWindow`
  composes `Frame` + `TitleBar` and adds the classic raised bevel plus eight resize handles.
  It is presentation-only: drag/resize/close are injected by the theme.

Icons are **not** re-exported here — import them directly from `@react95/icons`
(`import { Notepad } from '@react95/icons'`). This keeps the bundle small: `@react95/icons`
ships 1000+ icons with no `sideEffects: false`.

## Usage

```bash
pnpm add @owdproject/react-kit-react95 @react95/icons
```

```tsx
import '@owdproject/react-kit-react95/styles.css'
import { React95Provider, Button, Frame, List } from '@owdproject/react-kit-react95'
import { Notepad } from '@react95/icons'

export function App() {
  return (
    <React95Provider>
      <Frame>
        <List>
          <List.Item icon={<Notepad variant="16x16_4" />}>Notepad</List.Item>
        </List>
        <Button>Click me</Button>
      </Frame>
    </React95Provider>
  )
}
```

## Bundler tip (tree-shaking)

`@react95/*` does not declare `sideEffects: false`, so Rollup keeps **all** icon/component
modules unless you tell it otherwise. Add this to your Vite config to drop the unused ones:

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: {
        moduleSideEffects(id) {
          // keep CSS, prune pure-JS React95 modules
          if (id.includes('@react95/')) return id.includes('.css')
          return true
        },
      },
    },
  },
})
```

Without it a hello-world app bundles all of `@react95/icons` (~4.5 MB extra JS).

## License

MIT
