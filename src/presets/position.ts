import { ThemeValue, ResponsiveValue } from 'styled-system'

import { ScalesTheme, RequiredScalesTheme } from '..'
import { scales } from '../core'

/**
 * A convenience scale group containing props related to position.
 */
export interface PositionScaleProps<
  ThemeType extends ScalesTheme = RequiredScalesTheme,
  TVal = ThemeValue<'spaceScales', ThemeType>
> {
  /**
   * The top CSS property participates in specifying the vertical position of a
   * positioned element. It has no effect on non-positioned elements.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/top)
   */
  topScale?: ResponsiveValue<TVal, ThemeType>
  /**
   * The right CSS property participates in specifying the horizontal position
   * of a positioned element. It has no effect on non-positioned elements.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/right)
   */
  rightScale?: ResponsiveValue<TVal, ThemeType>
  /**
   * The bottom CSS property participates in specifying the vertical position
   * of a positioned element. It has no effect on non-positioned elements.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/top)
   */
  bottomScale?: ResponsiveValue<TVal, ThemeType>
  /**
   * The left CSS property participates in specifying the horizontal position
   * of a positioned element. It has no effect on non-positioned elements.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/left)
   */
  leftScale?: ResponsiveValue<TVal, ThemeType>
}

const configs = {
  topScale: {
    systemProp: 'top',
    scale: 'spaceScales',
  },
  rightScale: {
    systemProp: 'right',
    scale: 'spaceScales',
  },
  bottomScale: {
    systemProp: 'bottom',
    scale: 'spaceScales',
  },
  leftScale: {
    systemProp: 'left',
    scale: 'spaceScales',
  },
}

export const positionScales = scales(configs)
