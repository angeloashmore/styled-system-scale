import { scales } from '../index'

const configs = {
  fontSizeScale: {
    systemProp: 'fontSize',
    scale: 'fontSizeScales',
  },
}

export const typographyScales = scales(configs)
