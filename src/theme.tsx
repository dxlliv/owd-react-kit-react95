import type { ReactNode } from 'react'

// React95 global reset (fonts, scrollbars, links)...
import '@react95/core/GlobalStyle'
// ...and the Windows 95 design tokens (CSS custom properties --r95-*).
import '@react95/core/themes/win95.css'

export interface React95ProviderProps {
  children?: ReactNode
}

/**
 * Bootstraps the React95 look & feel.
 *
 * The two CSS entrypoints above are side-effect imports, so simply importing
 * `@owdproject/react-kit-react95` is enough to style the whole tree. This component
 * exists as an explicit, self-documenting boundary and to give themes a single
 * place to mount/switch React95 themes in the future.
 */
export function React95Provider({ children }: React95ProviderProps) {
  return <>{children}</>
}
