import { scales } from '../core'

const configs = {}

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
