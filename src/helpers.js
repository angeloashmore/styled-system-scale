import { stripUnit } from 'polished'

// Generator function that returns an increasing modular scale value on each
// `next` call.
export function* modularScaleGen(i = 0, r = 2, p = 10) {
  let j = 0
  while (true) yield Math.round(p * Math.pow(r, j++)) / p + i
}

// Generator function that returns an increasing linear scale value on each
// `next` call.
export function* linearScaleGen(i = 0, r = 1, p = 10) {
  let j = 0
  while (true) yield Math.round(p * j++ * r) / p + i
}

// Returns a linear ratio given a min, max, and number of steps to get from min
// to max.
export const linearRatio = (min, max, steps = 1) => (max - min) / steps

// Returns a scale using the provided scaling function.
export const scale = (
  count = 0,
  gen = linearScaleGen(),
  { unit = 0, min = -Infinity, max = Infinity, transform = x => x } = {},
) => {
  const arr = []

  for (let i = 0; i < count; i++)
    arr.push(
      Math.min(max, Math.max(min, transform(gen.next().value, i, count))) +
        unit,
    )

  return arr
}

export const linearScale = (
  min,
  max,
  { count, precision, unit, ...opts } = {},
) => {
  const [minV, minU] = stripUnit(min, true)
  const [maxV, maxU] = stripUnit(max, true)

  if (!unit && minU !== maxU)
    throw new Error('Units of min and max do not match.')

  count = count || maxV - minV + 1
  unit = unit || minU

  const r = linearRatio(minV, maxV, count - 1)
  const gen = linearScaleGen(minV, r, precision)

  return scale(count, gen, { unit, ...opts })
}
