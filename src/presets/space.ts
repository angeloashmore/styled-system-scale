import { ThemeValue, ResponsiveValue } from 'styled-system'

import { ScalesTheme, RequiredScalesTheme } from '..'
import { scales, ScaleConfigs } from '../core'

/**
 * A convenience scale group containing props related to margin and padding.
 */
export interface SpaceScaleProps<
  ThemeType extends ScalesTheme = RequiredScalesTheme,
  TVal = ThemeValue<'spaceScales', ThemeType>
> {
  /** Margin on top, left, bottom and right */
  mScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on top, left, bottom and right */
  marginScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on top */
  mtScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on top */
  marginTopScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on right */
  mrScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on right */
  marginRightScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on bottom */
  mbScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on bottom */
  marginBottomScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on left */
  mlScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on left */
  marginLeftScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on left and right */
  mxScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on left and right */
  marginXScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on top and bottom */
  myScale?: ResponsiveValue<TVal, ThemeType>
  /** Margin on top and bottom */
  marginYScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on top, left, bottom and right */
  pScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on top, left, bottom and right */
  paddingScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on top */
  ptScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on top */
  paddingTopScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on right */
  prScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on right */
  paddingRightScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on bottom */
  pbScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on bottom */
  paddingBottomScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on left */
  plScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on left */
  paddingLeftScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on left and right */
  pxScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on left and right */
  paddingXScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on top and bottom */
  pyScale?: ResponsiveValue<TVal, ThemeType>
  /** Padding on top and bottom */
  paddingYScale?: ResponsiveValue<TVal, ThemeType>
}

const configs: Record<any, ScaleConfigs> = {}

configs.margin = {
  marginScale: {
    systemProp: 'm',
    scale: 'spaceScales',
  },
  marginTopScale: {
    systemProp: 'mt',
    scale: 'spaceScales',
  },
  marginRightScale: {
    systemProp: 'mr',
    scale: 'spaceScales',
  },
  marginBottomScale: {
    systemProp: 'mb',
    scale: 'spaceScales',
  },
  marginLeftScale: {
    systemProp: 'ml',
    scale: 'spaceScales',
  },
  marginXScale: {
    systemProp: 'mx',
    scale: 'spaceScales',
  },
  marginYScale: {
    systemProp: 'my',
    scale: 'spaceScales',
  },
}
configs.margin.mScale = configs.margin.marginScale
configs.margin.mtScale = configs.margin.marginTopScale
configs.margin.mrScale = configs.margin.marginRightScale
configs.margin.mbScale = configs.margin.marginBottomScale
configs.margin.mlScale = configs.margin.marginLeftScale
configs.margin.mxScale = configs.margin.marginXScale
configs.margin.myScale = configs.margin.marginYScale

configs.padding = {
  paddingScale: {
    systemProp: 'p',
    scale: 'spaceScales',
  },
  paddingTopScale: {
    systemProp: 'pt',
    scale: 'spaceScales',
  },
  paddingRightScale: {
    systemProp: 'pr',
    scale: 'spaceScales',
  },
  paddingBottomScale: {
    systemProp: 'pb',
    scale: 'spaceScales',
  },
  paddingLeftScale: {
    systemProp: 'pl',
    scale: 'spaceScales',
  },
  paddingXScale: {
    systemProp: 'px',
    scale: 'spaceScales',
  },
  paddingYScale: {
    systemProp: 'py',
    scale: 'spaceScales',
  },
}
configs.padding.pScale = configs.padding.paddingScale
configs.padding.ptScale = configs.padding.paddingTopScale
configs.padding.prScale = configs.padding.paddingRightScale
configs.padding.pbScale = configs.padding.paddingBottomScale
configs.padding.plScale = configs.padding.paddingLeftScale
configs.padding.pxScale = configs.padding.paddingXScale
configs.padding.pyScale = configs.padding.paddingYScale

export const marginScales = scales(configs.margin)
export const paddingScales = scales(configs.padding)
export const spaceScales = scales({ ...configs.margin, ...configs.padding })
