import { scales } from '../core'

const configs = {}

configs.margin = {
  marginScale: {
    systemProp: 'margin',
    scale: 'spaceScales',
  },
  marginTopScale: {
    systemProp: 'marginTop',
    scale: 'spaceScales',
  },
  marginRightScale: {
    systemProp: 'marginRight',
    scale: 'spaceScales',
  },
  marginBottomScale: {
    systemProp: 'marginBottom',
    scale: 'spaceScales',
  },
  marginLeftScale: {
    systemProp: 'marginLeft',
    scale: 'spaceScales',
  },
  marginXScale: {
    properties: 'marginX',
    scale: 'spaceScales',
  },
  marginYScale: {
    systemProp: 'marginY',
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
    systemProp: 'padding',
    scale: 'spaceScales',
  },
  paddingTopScale: {
    systemProp: 'paddingTop',
    scale: 'spaceScales',
  },
  paddingRightScale: {
    systemProp: 'paddingRight',
    scale: 'spaceScales',
  },
  paddingBottomScale: {
    systemProp: 'paddingBottom',
    scale: 'spaceScales',
  },
  paddingLeftScale: {
    systemProp: 'paddingLeft',
    scale: 'spaceScales',
  },
  paddingXScale: {
    systemProp: 'paddingX',
    scale: 'spaceScales',
  },
  paddingYScale: {
    systemProp: 'paddingY',
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
