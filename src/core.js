import { get } from 'styled-system'

const castArray = x => (Array.isArray(x) ? x : [x])

const firstLeft = (arr, idx) => {
  if (idx >= arr.length) idx = arr.length - 1

  while (idx > -1 && (arr[idx] === null || arr[idx] === undefined)) idx--

  return arr[idx]
}

const defaults = { breakpoints: [40, 52, 64].map(x => x + 'rem') }

const parsePropValue = value => {
  const isNegative = value[0] === '-'
  const baseValue = isNegative ? value.slice(1) : value

  return [baseValue, isNegative]
}

export const scales = configs => {
  const cache = {}
  const parse = props => {
    cache.breakpoints =
      cache.breakpoints || get(props.theme, 'breakpoints', defaults.breakpoints)
    const systemProps = {}

    for (const key in props) {
      const prop = castArray(props[key])
      const config = configs[key]

      if (!config) continue

      const systemProp = config.systemProp
      const scale = get(props.theme, config.scale, config.defaultScale)

      const result = []

      for (let i = 0; i < cache.breakpoints.length + 1; i++) {
        const [s, isNeg] = parsePropValue(firstLeft(prop, i))

        if (s === undefined) continue

        const v = scale[s][i]

        if (isNeg) result[i] = typeof v === 'number' ? -v : `-${v}`
        else result[i] = v
      }

      systemProps[systemProp] = result
    }

    return { ...systemProps, ...props }
  }

  parse.configs = configs
  parse.cache = cache

  return parse
}

export const composeScales = (...parsers) => {
  const configs = {}

  for (let i = 0; i < parsers.length; i++)
    Object.assign(configs, parsers[i].configs)

  return scales(configs)
}

export const interceptScales = scaleParser => systemParser => props =>
  systemParser(scaleParser(props))
