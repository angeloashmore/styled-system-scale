import {
  scale,
  linearScaleGen,
  linearRatio,
  modularScaleGen,
  linearScale,
} from './helpers'

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
    const minResult = scale(4, linearScaleGen(), { min: 1 })
    expect(minResult).toEqual([1, 1, 2, 3])

    const maxResult = scale(4, linearScaleGen(), { max: 2 })
    expect(maxResult).toEqual([0, 1, 2, 2])

    const minMaxResult = scale(4, linearScaleGen(), { min: 1, max: 2 })
    expect(minMaxResult).toEqual([1, 1, 2, 2])
  })

  test('allows setting a unit for all values', () => {
    const result = scale(4, linearScaleGen(), { unit: 'rem' })
    expect(result).toEqual(['0rem', '1rem', '2rem', '3rem'])
  })
})

describe('linearScaleGen', () => {
  test('returns a linear scale', () => {
    const result = scale(4, linearScaleGen())
    expect(result).toEqual([0, 1, 2, 3])
  })

  test('allows setting the initial value of the scale', () => {
    const result = scale(4, linearScaleGen(10.5, 0.25))
    expect(result).toEqual([10.5, 10.8, 11, 11.3])
  })

  test('allows setting the ratio', () => {
    const result = scale(4, linearScaleGen(0, 5))
    expect(result).toEqual([0, 5, 10, 15])
  })

  test('allows setting the precision', () => {
    const result = scale(4, linearScaleGen(0, 0.33333, 100))
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

describe('modularScaleGen', () => {
  test('returns a modular scale', () => {
    const result = scale(4, modularScaleGen())
    expect(result).toEqual([1, 2, 4, 8])
  })

  test('allows setting the initial value of the scale', () => {
    const result = scale(4, modularScaleGen(10))
    expect(result).toEqual([11, 12, 14, 18])
  })

  test('allows setting the ratio', () => {
    const result = scale(4, modularScaleGen(0, 2))
    expect(result).toEqual([1, 2, 4, 8])
  })

  test('allows setting the precision', () => {
    const result = scale(4, modularScaleGen(0, Math.sqrt(2), 100))
    expect(result).toEqual([1, 1.41, 2, 2.83])
  })
})

describe('linearScale', () => {
  test('returns a linear scale with a given start and end value', () => {
    const result = linearScale(4, 8)
    expect(result).toEqual([4, 5, 6, 7, 8])
  })

  test('allows setting a count', () => {
    const result = linearScale(4, 8, { count: 9 })
    expect(result).toEqual([4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8])
  })

  test('allows providing units', () => {
    const result = linearScale('4rem', '8rem')
    expect(result).toEqual(['4rem', '5rem', '6rem', '7rem', '8rem'])
  })

  test('throws if units of min and max do not match', () => {
    expect(() => linearScale('4px', '8rem')).toThrow('do not match')
  })

  test('passes options to scale', () => {
    const result = linearScale(4, 8, { unit: 'rem' })
    expect(result).toEqual(['4rem', '5rem', '6rem', '7rem', '8rem'])
  })

  test('passing unit option overrides min and max units', () => {
    const result = linearScale('4rem', '8rem', { unit: 'px' })
    expect(result).toEqual(['4px', '5px', '6px', '7px', '8px'])
  })
})
