import { get } from 'styled-system'

const firstLeft = (arr, idx) => {
  if (idx >= arr.length) idx = arr.length - 1

  while (idx > -1 && (arr[idx] === null || arr[idx] === undefined)) idx--

  return arr[idx]
}

const castArray = x => (Array.isArray(x) ? x : [x])

export const createStyleScaleFunction = ({
  key,
  properties,
  property,
  scale: scaleKey,
  defaultScale = [],
}) => {
  properties = properties || [property]

  return props => {
    if (!props.hasOwnProperty(key)) return {}

    // TODO: Support named breakpoints via objects. This only supports array
    // responsive styles.

    // TODO: Support default breakpoints from styled-system.

    const theme = props.theme || {}
    const scale = theme[scaleKey] || defaultScale
    const breakpoints = theme.breakpoints || []

    const prop = castArray(props[key])
    // const propScales = castArray(prop[0])
    // const propOpts = prop[1] || {}

    const systemResult = []

    // breakpoints.length + 1 is used since we need the base value (i.e. the
    // value used below the first breakpoint).
    for (let i = 0; i < breakpoints.length + 1; i++) {
      const s = firstLeft(prop, i)
      const v = scale[s][i]

      if (v === undefined) systemResult[i] = s
      else systemResult[i] = v
    }

    const result = {}

    for (let i = 0; i < properties.length; i++)
      result[properties[i]] = systemResult

    return result
  }
}

// // Returns a list of values from a modular scale using the provided base value.
// export const scaled = (
//   base = 0,
//   { ratio, count = 5, max = Infinity, floating = false, mask = [] } = {},
// ) =>
//   compose(
//     !isEmpty(mask)
//       ? mapIndexed(([idx, v]) => {
//           if (idx >= mask.length) return v
//           if (mask[idx] === true) return v
//           return mask[idx]
//         })
//       : identity,
//     floating ? identity : map(ceil),
//     map(v => Math.min(ms(v, ratio), max)),
//     range(__, base + count),
//   )(base)

// export const parseScaleProp = (prop, theme, defaultOpts) => {
//   prop = castArray(prop)

//   const propScales = castArray(prop[0])
//   const propOpts = prop[1] || {}
//   const breakpointsCount = theme.breakpoints.length

//   return propScales.map((scale, index) => {
//     if (isNull(scale)) return null
//     if (!has([fontSizeScaleRatios, scale], theme)) return scale

//     const { ratio, min, max } = get(['fontSizeScaleRatios', scale], theme)

//     return scaled(min, {
//       ratio,
//       min,
//       max,
//       count: breakpointsCount,
//       ...defaultOpts,
//       ...propOpts,
//     })[index]
//   })
// }
