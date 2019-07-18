import { scales } from '../core'

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
