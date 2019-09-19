import { scales } from '../core'

const configs = {
  topScale: {
    systemProp: 'top',
    scale: 'space',
  },
  rightScale: {
    systemProp: 'right',
    scale: 'space',
  },
  bottomScale: {
    systemProp: 'bottom',
    scale: 'space',
  },
  leftScale: {
    systemProp: 'left',
    scale: 'space',
  },
}

export const positionScales = scales(configs)
