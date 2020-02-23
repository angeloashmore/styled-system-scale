import { scales } from '../core'

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
