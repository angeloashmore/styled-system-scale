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

export const scales = configs => {
  const cache = {}
  const parse = props => {
    cache.breakpoints =
      (props.theme && props.theme.breakpoints) || defaults.breakpoints
    const systemProps = {}

    const propKeys = Object.keys(props)

    for (let i = 0; i < propKeys.length; i++) {
      const key = propKeys[i]
      const prop = props[key]
      const config = configs[key]

      if (!config) continue

      const systemProp = config.systemProp
      const scale =
        (props.theme && props.theme[config.scale]) || config.defaultScale

      if (!Array.isArray(prop)) {
        const [s, isNeg] = parsePropValue(prop)

        if (s === undefined) continue

        if (isNeg) systemProps[systemProp] = scale[s].map(negate)
        else systemProps[systemProp] = scale[s]
      } else {
        const result = []

        for (let j = 0; j < cache.breakpoints.length + 1; j++) {
          const [s, isNeg] = parsePropValue(firstLeft(prop, j))

          if (s === undefined) continue

          if (isNeg) result[j] = negate(scale[s][j])
          else result[j] = scale[s][j]
        }

        systemProps[systemProp] = result
      }
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
