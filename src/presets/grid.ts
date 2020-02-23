import { ThemeValue, ResponsiveValue } from 'styled-system'

import { ScalesTheme, RequiredScalesTheme } from '..'
import { scales } from '../core'

/**
 * A convenience scale group containing props related to grid.
 */
export interface GridScaleProps<
  ThemeType extends ScalesTheme = RequiredScalesTheme,
  TVal = ThemeValue<'spaceScales', ThemeType>
> {
  /**
   * The gap CSS property sets the gaps (gutters) between rows and columns. It
   * is a shorthand for row-gap and column-gap.
   *
   * @deprecated use gap
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
   */
  gridGapScale?: ResponsiveValue<TVal, ThemeType>
  /**
   * The column-gap CSS property sets the size of the gap (gutter) between an
   * element's columns.
   *
   * @deprecated use column-gap
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
   */
  gridColumnGapScale?: ResponsiveValue<TVal, ThemeType>
  /**
   * The row-gap CSS property sets the size of the gap (gutter) between an
   * element's rows.
   *
   * @deprecated use row-gap
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
   */
  gridRowGapScale?: ResponsiveValue<TVal, ThemeType>
}

const configs = {
  gridGapScale: {
    systemProp: 'gridGap',
    scale: 'spaceScales',
  },
  gridColumnGapScale: {
    systemProp: 'gridColumnGap',
    scale: 'spaceScales',
  },
  gridRowGapScale: {
    systemProp: 'gridRowGap',
    scale: 'spaceScales',
  },
}

export const gridScales = scales(configs)
