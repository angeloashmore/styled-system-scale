import { scales, composeScales, interceptScales } from './core'

const theme = {
  fontSizeScales: { base: [1, 2, 3, 4] },
  space: { base: [0, 1, 2, 3] },
}

const fontSizeScale = scales({
  fontSizeScale: { systemProp: 'fontSize', scale: 'fontSizeScales' },
})

const mScale = scales({ mScale: { systemProp: 'm', scale: 'space' } })

describe('scales', () => {
  test('returns parser', () => {
    expect(typeof fontSizeScale).toBe('function')

    const props = { theme, fontSizeScale: 'base' }
    const result = fontSizeScale(props)
    expect(result).toEqual({ ...props, fontSize: theme.fontSizeScales.base })
  })

  test('parser transforms negative values', () => {
    const props = { theme, fontSizeScale: '-base' }
    const result = fontSizeScale(props)
    expect(result).toEqual({
      ...props,
      fontSize: theme.fontSizeScales.base.map(x => -x),
    })
  })
})

describe('composeScales', () => {
  test('combines parsers into one', () => {
    const parser = composeScales(fontSizeScale, mScale)
    const props = { theme, fontSizeScale: 'base', mScale: 'base' }
    const result = parser(props)
    expect(result).toEqual({
      ...props,
      fontSize: theme.fontSizeScales.base,
      m: theme.space.base,
    })
  })
})

describe('interceptScales', () => {
  test('transforms scale prop values', () => {
    const systemMock = jest.fn()

    const props = { theme, fontSizeScale: 'base' }
    interceptScales(fontSizeScale)(systemMock)(props)

    expect(systemMock).toHaveBeenCalledWith({
      ...props,
      fontSize: theme.fontSizeScales.base,
    })
  })
})
