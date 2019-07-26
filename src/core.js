const defaults = { breakpoints: [40, 52, 64].map(x => x + 'rem') }

const firstLeft = (arr, idx) => {
  if (idx >= arr.length) idx = arr.length - 1

  while (idx > -1 && (arr[idx] === null || arr[idx] === undefined)) idx--

  return arr[idx]
}

const parsePropValue = value => {
  const isNegative = value[0] === '-'
  const baseValue = isNegative ? value.slice(1) : value

  return [baseValue, isNegative]
}

const negate = v => (typeof v === 'number' ? -v : '-' + v)

const parseProp = (prop, theme, config) => {
  const scale = theme[config.scale] || config.defaultScale

  if (Array.isArray(prop)) {
    const result = []
    const count = theme.breakpoints.length + 1

    for (let i = 0; i < count; i++) {
      const [s, isNeg] = parsePropValue(firstLeft(prop, i))

      if (s === undefined) return

      result[i] = isNeg ? negate(scale[s][i]) : scale[s][i]
    }

    return result
  }

  const [s, isNeg] = parsePropValue(prop)

  if (s === undefined) return

  return isNeg ? scale[s].map(negate) : scale[s]
}

export const scales = configs => {
  const cache = {}
  const parse = props => {
    const propKeys = Object.keys(props)
    const systemProps = {}
    const theme = props.theme || {}

    for (let i = 0; i < propKeys.length; i++) {
      if (!(propKeys[i] in configs)) continue

      const key = propKeys[i]
      const prop = props[key]
      const config = configs[key]
      const systemProp = config.systemProp

      const val = parseProp(prop, theme, config)

      systemProps[systemProp] = val
    }

    return Object.assign(systemProps, props)
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
