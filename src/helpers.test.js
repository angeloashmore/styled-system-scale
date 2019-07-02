import { scale, linearScale, linearRatio, modularScale } from './helpers'

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

describe('linearScale', () => {
  test('returns a linear scale', () => {
    const result = scale(4, linearScale())
    expect(result).toEqual([0, 1, 2, 3])
  })

  test('allows setting the initial value of the scale', () => {
    const result = scale(4, linearScale(10))
    expect(result).toEqual([10, 11, 12, 13])
  })

  test('allows setting the ratio', () => {
    const result = scale(4, linearScale(0, 5))
    expect(result).toEqual([0, 5, 10, 15])
  })

  test('allows setting the precision', () => {
    const result = scale(4, linearScale(0, 0.33333, 100))
    expect(result).toEqual([0, 0.33, 0.67, 1])
  })
})

describe('linearRatio', () => {
  test('returns a linear ratio given two numbers', () => {
    const result = linearRatio(0, 5)
    expect(result).toBe(5)
  })

  test('allows setting the number of steps between numbers', () => {
    const result = linearRatio(0, 1, 4)
    expect(result).toBe(0.25)
  })
})

describe('modularScale', () => {
  test('returns a modular scale', () => {
    const result = scale(4, modularScale())
    expect(result).toEqual([1, 2, 4, 8])
  })

  test('allows setting the initial value of the scale', () => {
    const result = scale(4, modularScale(10))
    expect(result).toEqual([1024, 2048, 4096, 8192])
  })

  test('allows setting the ratio', () => {
    const result = scale(4, modularScale(0, 2))
    expect(result).toEqual([1, 2, 4, 8])
  })

  test('allows setting the precision', () => {
    const result = scale(4, modularScale(0, Math.sqrt(2), 100))
    expect(result).toEqual([1, 1.41, 2, 2.83])
  })
})
