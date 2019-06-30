import { scale, linearScale, linearRatio } from './helpers'

describe('scale', () => {
  test('returns an empty scale with default options', () => {
    const result = scale()
    expect(result).toEqual([])
  })

  test('returns a scale with a given count', () => {
    const result = scale(4)
    expect(result).toHaveLength(4)
  })

  test('returns a linear scale by default', () => {
    const result = scale(4)
    expect(result).toEqual([0, 1, 2, 3])
  })

  test('allows setting a min and max value', () => {
    const minResult = scale(4, linearScale(), { min: 1 })
    expect(minResult).toEqual([1, 1, 2, 3])

    const maxResult = scale(4, linearScale(), { max: 2 })
    expect(maxResult).toEqual([0, 1, 2, 2])

    const minMaxResult = scale(4, linearScale(), { min: 1, max: 2 })
    expect(minMaxResult).toEqual([1, 1, 2, 2])
  })
})
