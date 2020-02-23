import { ThemeValue, ResponsiveValue } from 'styled-system'

import { RequiredScalesTheme, ScalesTheme } from '..'
import { scales } from '../core'

/**
 * A convenience scale group containing props related to typography.
 */
export interface TypographyScaleProps<
  ThemeType extends ScalesTheme = RequiredScalesTheme,
  TVal = ThemeValue<'fontSizeScales', ThemeType>
> {
  /**
   * The font-size CSS property sets the size of the font. This property is
   * also used to compute the size of em, ex, and other relative <length>
   * units.
   *
   * [MDN reference](http://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
   */
  fontSizeScale?: ResponsiveValue<TVal, ThemeType>
}

const configs = {
  fontSizeScale: {
    systemProp: 'fontSize',
    scale: 'fontSizeScales',
  },
}

export const typographyScales = scales(configs)
