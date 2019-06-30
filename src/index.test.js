import { createStyleScaleFunction } from './index'
import { scale, linearScale } from './helpers'

const theme = {
  breakpoints: ['1rem', '2rem', '3rem'],
  fontSizeScales: {
    medium: scale(4, linearScale()),
    large: scale(4, linearScale(10)),
  },
  fontSizes: scale(10, linearScale()),
  space: scale(10, linearScale(0, 0.25, 100)),
}

const fontSizeScale = createStyleScaleFunction({
  key: 'fontSizeScale',
  property: 'fontSize',
  scale: 'fontSizeScales',
})

describe('createStyleScaleFunction', () => {
  test('returns a style scale function', () => {
    const systemProps = fontSizeScale({
      theme,
      fontSizeScale: 'medium',
    })

    expect(systemProps).toEqual({ fontSize: [0, 1, 2, 3] })
  })

  test('supports responsive scales', () => {
    const systemProps = fontSizeScale({
      theme,
      fontSizeScale: ['medium', null, 'large'],
    })

    expect(systemProps).toEqual({ fontSize: [0, 1, 12, 13] })
  })
})
