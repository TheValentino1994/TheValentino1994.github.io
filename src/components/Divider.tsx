import { tokens as T } from '../constants/tokens'

export function Divider() {
  return (
    <div style={{ width: '100%', height: '1px', background: T.border, flexShrink: 0 }} />
  )
}
