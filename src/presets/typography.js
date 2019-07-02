import { scales } from '../core'

const configs = {
  fontSizeScale: {
    systemProp: 'fontSize',
    scale: 'fontSizeScales',
  },
}

export const typographyScales = scales(configs)
