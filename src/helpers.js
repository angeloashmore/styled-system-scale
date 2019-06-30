// Generator function that returns an increasing modular scale value on each
// `next` call.
export function* modularScale(i = 0, r = Math.sqrt(2), p = 10) {
  while (true) yield Math.round(p * Math.pow(r, i++)) / p
}

// Generator function that returns an increasing linear scale value on each
// `next` call.
export function* linearScale(i = 0, r = 1, p = 10) {
  while (true) yield Math.round(p * i++ * r) / p
}

// Returns a linear ratio given a min, max, and number of steps
// between the min and max.
export const linearRatio = (min, max, steps = 1) => (max - min) / steps

// Returns a scale using the provided scaling function.
export const scale = (
  count = 0,
  gen = linearScale(),
  { min = -Infinity, max = Infinity, transform = x => x } = {},
) => {
  const arr = []

  for (let i = 0; i < count; i++)
    arr.push(
      Math.min(max, Math.max(min, transform(gen.next().value, i, count))),
    )

  return arr
}
