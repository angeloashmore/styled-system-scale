import { Theme } from 'styled-system'
import * as CSS from 'csstype'

export * from './core'
export * from './helpers'

export * from './presets/grid'
export * from './presets/position'
export * from './presets/space'
export * from './presets/typography'

export interface ScalesTheme extends Theme {
  spaceScales?: Record<
    any,
    (string | number | CSS.MarginProperty<number | string>)[]
  >
  fontSizeScales?: Record<
    any,
    (string | number | CSS.FontSizeProperty<number>)[]
  >
}

export type RequiredScalesTheme = Required<ScalesTheme>
