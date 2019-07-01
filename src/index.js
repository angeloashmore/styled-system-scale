export { scale, linearScale, linearRatio, modularScale } from './helpers'

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
  // system,
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

export const createParser = config => {
  const cache = {}
  const parse = props => {
    for (const key in props) {
      if (!config[key]) continue

      const sx = config[key]
      const raw = props[key]
      const scale = get(props.theme, sx.scale, sx.defaults)
      cache.breakpoints =
        cache.breakpoints ||
        get(props.theme, 'breakpoints', defaults.breakpoints)

      const systemResult = []

      // breakpoints.length + 1 is used since we need the base value (i.e. the
      // value used below the first breakpoint).
      for (let i = 0; i < cache.breakpoints.length + 1; i++) {
        const s = firstLeft(raw, i)
        const v = get(scale, s + '.' + i, s)

        systemResult[i] = v
      }

      // for (let i = 0; i < sx.properties)
    }
  }

  parse.config = config
  parse.propNames = Object.keys(config)
  parse.cache = cache

  return parse
}

export const composeScales = (...parsers) => {
  let config = {}
  parsers.forEach(parser => {
    if (!parser || !parser.config) return
    assign(config, parser.config)
  })
  const parser = createParser(config)

  return parser
}

export const scaled = (scaleParser, systemParser) => props =>
  systemParser(scaleParser(props))
