// Generator function that returns an increasing modular scale value on each
// `next` call.
export function* modularScale(i = 0, r = 2, p = 10) {
  let j = 0
  while (true) yield Math.round(p * Math.pow(r, j++)) / p + i
}

// Generator function that returns an increasing linear scale value on each
// `next` call.
export function* linearScale(i = 0, r = 1, p = 10) {
  let j = 0
  while (true) yield Math.round(p * j++ * r) / p + i
}

// Returns a linear ratio given a min, max, and number of steps
// between the min and max.
export const linearRatio = (min, max, steps = 1) => (max - min) / steps

// Returns a scale using the provided scaling function.
export const scale = (
  count = 0,
  gen = linearScale(),
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
