import { createStyleScaleFunction } from './index'

const theme = {
  breakpoints: ['1rem', '2rem', '3rem'],
  fontSizeScales: {
    medium: [0, 1, 2, 3],
    large: [10, 11, 12, 13],
  },
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
