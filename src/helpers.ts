type ScaleElement = string | number
type WeakScaleElement = string | number | undefined
type Scale<T = ScaleElement> = T[]
type WeakScale<T = WeakScaleElement> = T[]

const cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/

const stripUnit = <T>(
  val: T,
  unitReturn: boolean = false,
): T | number | [T | number, string?] => {
  if (typeof val !== 'string') return unitReturn ? [val, undefined] : val
  const matchedValue = val.match(cssRegex)

  if (unitReturn) {
    if (matchedValue) return [parseFloat(val), matchedValue[2]]
    return [val, undefined]
  }

  if (matchedValue) return parseFloat(val)
  return val
}

/**
 * Generator function that returns an modular scale values.
 *
 * @param initial Starting/first value of the scale.
 * @param ratio Ratio between values.
 * @param precision Number precision for scale values.
 *
 * @returns Increasing modular scale values on each `next` call.
 */
export function* modularScaleGen(
  initial = 0,
  ratio = 2,
  precision = 100,
): Generator<number, never> {
  let j = 0
  while (true)
    yield Math.round(precision * Math.pow(ratio, j++)) / precision + initial
}

/**
 * Generator function that returns linear scale values.
 *
 *
 * @param initial Starting/first value of the scale.
 * @param difference Difference between values.
 * @param precision Number precision for scale values.
 *
 * @returns Increasing linear scale values on each `next` call.
 */
export function* linearScaleGen(
  initial = 0,
  difference = 1,
  precision = 100,
): Generator<number, never> {
  let j = 0
  while (true)
    yield Math.round(precision * j++ * difference) / precision + initial
}

/**
 * Calculates a linear ratio given a min, max, and number of steps to get from min
 * to max.
 *
 * @param min Minimum value in the scale.
 * @param max Maximum value in the scale.
 * @param steps Number of steps to get from `min` to `max` in the scale.
 *
 * @returns Ratio between each step in the linear scale.
 */
export const linearRatio = (min: number, max: number, steps = 1) =>
  (max - min) / steps

/**
 * Options for creating a scale.
 */
interface ScaleOptions {
  /** A CSS unit to assign to each value in the scale (e.g. "px", "rem") */
  unit?: string
  /** Minumum value in the scale */
  min?: number
  /** Maximum value in the scale */
  max?: number
  /**
   * Transformer function applied to each value in the scale. Useful if the
   * scale value needs to be shifted or is dependent on other values.
   *
   * @param val A scale value.
   * @param index Index of the value in the scale.
   * @param count Total number of values in the scale.
   *
   * @returns The transformed scale value.
   */
  transform?: (val: number, index: number, count: number) => number
}

/**
 * Creates a scale using the provided scaling function.
 *
 * @param count Total number of values in the scale.
 * @param gen Generator function to create values in the scale.
 * @param options Options to configure the scale.
 *
 * @returns An array of values on the scale.
 */
export const scale = (
  count: number,
  gen: Generator<number, never> = linearScaleGen(),
  options: ScaleOptions = {},
): Scale => {
  const {
    unit,
    min = -Infinity,
    max = Infinity,
    transform = val => val,
  } = options

  const arr = []

  for (let i = 0; i < count; i++) {
    let val = Math.min(
      max,
      Math.max(min, transform(gen.next().value, i, count)),
    )

    if (unit === undefined) arr.push(val)
    else arr.push(val + unit)
  }

  return unit === undefined ? (arr as number[]) : (arr as string[])
}

/**
 * Options for creating a linear scale.
 */
interface LinearScaleOptions extends ScaleOptions {
  /** Total number of values in the scale */
  count?: number
  /** Difference between values in the scale */
  difference?: number
  /** Number precision for scale values. */
  precision?: number
}

/**
 * Creates a linear scale.
 *
 * @param min The minimum value in the scale.
 * @param max The maximum value in the scale.
 * @param options Options to configure the scale.
 *
 * @returns An array of values on the scale.
 */
export const linearScale = <T extends number | string>(
  min: T,
  max: T,
  options: LinearScaleOptions = {},
) => {
  const { precision, ...opts } = options
  let { count, difference, unit } = options

  if (count && difference)
    throw new Error(
      'Count and ratio were provided, but only one can be defined.',
    )

  const [minN, minU] = stripUnit(min, true) as [number, string?]
  const [maxN, maxU] = stripUnit(max, true) as [number, string?]

  if (!unit && minU !== maxU)
    throw new Error('Units of min and max do not match.')

  unit = unit || minU

  if (count) {
    difference = linearRatio(minN, maxN, count - 1)
  } else if (difference) {
    count = (maxN - minN) / difference + 1
  } else {
    count = maxN - minN + 1
    difference = 1
  }

  const gen = linearScaleGen(minN, difference, precision)

  return scale(count, gen, { unit, min: minN, max: maxN, ...opts })
}

/**
 * Negates all values of a scale. Maintains the units of each value.
 *
 * @param scale Scale to negate.
 *
 * @returns The scale with all values negated.
 */
export const negateScale = (scale: WeakScale) =>
  scale.map(x => {
    if (typeof x === undefined) return x

    const [v, unit] = stripUnit(x, true) as [string | number, string?]

    return unit === undefined ? -v : -v + unit
  })

/**
 * Adds the right scale to the left. Maintains the unit of the left scale. The
 * unit of the right scale is ignored.
 *
 * @param a The left scale. The unit of this scale is used in the new scale.
 * @param b The right scale. The unit of this scale is ignored.
 *
 * @returns A scale with values of pairs from each scale added.
 */
export const addScales = (a: WeakScale, b: WeakScale): WeakScale => {
  const [, unit] = stripUnit(a[0], true) as [unknown, string?]
  const hasUnit = unit !== undefined
  const result = []

  for (let i = 0; i < a.length; i++) {
    const ai = stripUnit(a[i] || 0) as string | number
    const bi = stripUnit(b[i] || 0) as string | number

    result[i] = hasUnit
      ? (ai as string) + (bi as string) + unit
      : (ai as number) + (bi as number)
  }

  return result
}

/**
 * Subtracts the right scale from the left. Maintains the unit of the left
 * scale. The unit of the right scale is ignored.
 *
 * @param a The left scale. The unit of this scale is used in the new scale.
 * @param b The right scale. The unit of this scale is ignored.
 *
 * @returns A scale with values of pairs from each scale subtracted.
 */
export const subtractScales = (a: WeakScale, b: WeakScale) =>
  addScales(a, negateScale(b))

/**
 * Merges scale values from the right scale into the left scale. An undefined
 * value in the right scale falls back to the left scale value.
 *
 * @param a The left scale.
 * @param b The right scale.
 *
 * @returns A scale with merged values.
 */
export const mergeScalesLeft = (a: WeakScale, b: WeakScale): WeakScale => {
  const result = []

  for (let i = 0; i < Math.max(a.length, b.length); i++)
    result[i] = b[i] === undefined ? a[i] : b[i]

  return result
}

/**
 * Merges scale values from the left scale into the right scale. An undefined
 * value in the left scale falls back to the right scale value.
 *
 * @param a The left scale.
 * @param b The right scale.
 *
 * @returns A scale with merged values.
 */
export const mergeScalesRight = (a: WeakScale, b: WeakScale) =>
  mergeScalesLeft(b, a)
