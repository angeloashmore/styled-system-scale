type ScaleElement = string | number | undefined
type Scale = ScaleElement[]

const _cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/

const _stripUnit = (
  val: ScaleElement,
  unitReturn: boolean = false,
): [ScaleElement, string?] | ScaleElement => {
  if (typeof val !== 'string') return unitReturn ? [val, undefined] : val
  const matchedValue = val.match(_cssRegex)

  if (unitReturn) {
    if (matchedValue) return [parseFloat(val), matchedValue[2]]
    return [val, undefined]
  }

  if (matchedValue) return parseFloat(val)
  return val
}

// Generator function that returns an increasing modular scale value on each
// `next` call.
export function* modularScaleGen(
  i = 0,
  r = 2,
  p = 100,
): Generator<number, number, number> {
  let j = 0
  while (true) yield Math.round(p * Math.pow(r, j++)) / p + i
}

// Generator function that returns an increasing linear scale value on each
// `next` call.
export function* linearScaleGen(
  i = 0,
  r = 1,
  p = 100,
): Generator<number, number, number> {
  let j = 0
  while (true) yield Math.round(p * j++ * r) / p + i
}

// Returns a linear ratio given a min, max, and number of steps to get from min
// to max.
export const linearRatio = (min: number, max: number, steps = 1) =>
  (max - min) / steps

interface ScaleOptions {
  unit?: string
  min?: number
  max?: number
  transform?: (val: number, index: number, count: number) => number
}

// Returns a scale using the provided scaling function.
export const scale = (
  count = 0,
  gen = linearScaleGen(),
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
    let val: string | number = Math.min(
      max,
      Math.max(min, transform(gen.next().value, i, count)),
    )
    if (unit !== null && unit !== undefined) val = val + unit

    arr.push(val)
  }

  return arr
}

interface LinearScaleOptions extends ScaleOptions {
  count?: number
  ratio?: number
  precision?: number
}

// Returns a linear scale.
export const linearScale = (
  min: string | number,
  max: string | number,
  options: LinearScaleOptions = {},
): Scale => {
  const { precision, ...opts } = options
  let { count, ratio, unit } = options

  if (count && ratio)
    throw new Error(
      'Count and ratio were provided, but only one can be defined.',
    )

  const [minV, minU] = _stripUnit(min, true) as [number, string?]
  const [maxV, maxU] = _stripUnit(max, true) as [number, string?]

  if (!unit && minU !== maxU)
    throw new Error('Units of min and max do not match.')

  unit = unit || minU

  if (count) {
    ratio = linearRatio(minV, maxV, count - 1)
  } else if (ratio) {
    count = (maxV - minV) / ratio + 1
  } else {
    count = maxV - minV + 1
    ratio = 1
  }

  const gen = linearScaleGen(minV, ratio, precision)

  return scale(count, gen, { unit, min: minV, max: maxV, ...opts })
}

// Negates all values of a scale. Maintains units.
export const negateScale = (scale: Scale) =>
  scale.map(x => {
    if (typeof x === undefined) return x

    const [v, unit] = _stripUnit(x, true) as [string | number, string?]

    return unit === undefined ? -v : -v + unit
  })

// Adds two scales together. Maintains the unit of the left array. Unit of the
// right array is ignored.
export const addScales = (a: Scale, b: Scale): Scale => {
  const [, unit] = _stripUnit(a[0], true) as [unknown, string?]
  const hasUnit = unit !== undefined
  const result = []

  for (let i = 0; i < a.length; i++) {
    const ai = _stripUnit(a[i] || 0) as string | number
    const bi = _stripUnit(b[i] || 0) as string | number

    result[i] = hasUnit
      ? (ai as string) + (bi as string) + unit
      : (ai as number) + (bi as number)
  }

  return result
}

// Subtracts two scales. Maintains the unit of the left array. Unit of the
// right array is ignored.
export const subtractScales = (a: Scale, b: Scale) =>
  addScales(a, negateScale(b))

// Merge scale values from the right scale into the left scale. An undefined
// value in the right scale falls back to the left scale value.
export const mergeScalesLeft = (a: Scale, b: Scale): Scale => {
  const result = []

  for (let i = 0; i < Math.max(a.length, b.length); i++)
    result[i] = b[i] === undefined ? a[i] : b[i]

  return result
}

// Merge scale values from the left scale into the right scale. An undefined
// value in the left scale falls back to the right scale value.
export const mergeScalesRight = (a: Scale, b: Scale) => mergeScalesLeft(b, a)
