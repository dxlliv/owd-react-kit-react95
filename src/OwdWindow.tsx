import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactElement, ReactNode } from 'react'
import { Frame, TitleBar } from '@react95/core'

export type OwdResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

const RESIZE_HANDLES: OwdResizeDirection[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

export interface OwdWindowProps {
  title: string
  icon?: ReactElement
  active?: boolean
  maximized?: boolean
  closable?: boolean
  minimizable?: boolean
  maximizable?: boolean
  resizable?: boolean
  /** Fired when the React95 `TitleBar` receives a pointer down (drag handle). */
  onTitlePointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void
  /** Fired on title bar double click (usually toggle maximize). */
  onTitleDoubleClick?: () => void
  onClose?: () => void
  onMinimize?: () => void
  onToggleMaximize?: () => void
  /** Fired when a resize handle receives a pointer down. */
  onResizePointerDown?: (event: ReactPointerEvent<HTMLDivElement>, direction: OwdResizeDirection) => void
  /** Fired on any pointer down inside the window (usually to focus it). */
  onPointerDownCapture?: (event: ReactPointerEvent<HTMLDivElement>) => void
  style?: CSSProperties
  className?: string
  children: ReactNode
}

/**
 * A Windows 95 window composed from React95 primitives.
 *
 * React95 v10 (@react95/core) ships `TitleBar` with built-in
 * minimize/maximize/restore/close options but no window frame, so we compose
 * `Frame` + `TitleBar` and add the OWD bevel and resize handles.
 *
 * Pure presentation: drag/resize/close behaviour is injected by the theme,
 * which keeps `@owdproject/core` as the single source of truth for geometry.
 */
export function OwdWindow({
  title,
  icon,
  active = true,
  maximized = false,
  closable = true,
  minimizable = true,
  maximizable = true,
  resizable = true,
  onTitlePointerDown,
  onTitleDoubleClick,
  onClose,
  onMinimize,
  onToggleMaximize,
  onResizePointerDown,
  onPointerDownCapture,
  style,
  className = '',
  children,
}: OwdWindowProps) {
  const classes = ['r95-owd-window', className].filter(Boolean).join(' ')

  return (
    <Frame className={classes} style={style} onPointerDownCapture={onPointerDownCapture}>
      <TitleBar
        title={title}
        icon={icon}
        active={active}
        onPointerDown={onTitlePointerDown}
        onDoubleClick={onTitleDoubleClick}
      >
        <TitleBar.OptionsBox>
          {minimizable ? <TitleBar.Minimize onClick={onMinimize} /> : null}
          {maximizable ? (
            maximized ? (
              <TitleBar.Restore onClick={onToggleMaximize} />
            ) : (
              <TitleBar.Maximize onClick={onToggleMaximize} />
            )
          ) : null}
          {closable ? <TitleBar.Close onClick={onClose} /> : null}
        </TitleBar.OptionsBox>
      </TitleBar>

      <Frame className="r95-owd-window__body">
        <div className="r95-owd-window__content">{children}</div>
      </Frame>

      {resizable && !maximized && onResizePointerDown
        ? RESIZE_HANDLES.map((dir) => (
            <div
              key={dir}
              className={`r95-owd-resize r95-owd-resize--${dir}`}
              onPointerDown={(event) => onResizePointerDown(event, dir)}
            />
          ))
        : null}
    </Frame>
  )
}
