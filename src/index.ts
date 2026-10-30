/**
 * @owdproject/react-kit-react95
 * React95 (@react95/core) integration kit for Open Web Desktop React themes.
 *
 * - Re-exports the React95 components/tokens you typically need.
 * - Adds `React95Provider` (theme + GlobalStyle bootstrap) and `OwdWindow`
 *   (React95 Frame + TitleBar chrome with OWD resize handles).
 *
 * Icons are intentionally NOT re-exported: import them directly from
 * `@react95/icons` (e.g. `import { Notepad } from '@react95/icons'`) so only
 * the icons you use end up in your bundle.
 *
 * Re-exports are explicit (not `export *`) to keep them tree-shakeable.
 */

// React95 look & feel bootstrap (side-effect CSS).
export { React95Provider, type React95ProviderProps } from './theme'

// OWD window chrome.
export { OwdWindow, type OwdWindowProps, type OwdResizeDirection } from './OwdWindow'

// React95 components + tokens (named re-exports keep the bundle small).
export {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Cursor,
  Dropdown,
  Fieldset,
  Frame,
  Input,
  List,
  Modal,
  ProgressBar,
  RadioButton,
  Range,
  Tab,
  Tabs,
  TaskBar,
  TextArea,
  TitleBar,
  Tree,
  Tooltip,
  Video,
  contract,
  tokens,
  ModalEvents,
  useModal,
} from '@react95/core'
