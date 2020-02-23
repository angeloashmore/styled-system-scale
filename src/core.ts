type ScalePropElement = string | number
type ScaleProp = ScalePropElement | ScalePropElement[]
type ThemeScale = Record<any, ScalePropElement[]>

type Props = Record<any, any>

interface Theme {
  breakpoints: string[]
  [key: string]: unknown
}

interface ScaleConfig {
  systemProp: string
  scale?: string
  defaultScale?: ThemeScale
}

export type ScaleConfigs = Record<any, ScaleConfig>

const DEFAULT_BREAKPOINTS = ['40rem', '52rem', '64rem']

const firstLeft = <T>(arr: T[], idx: number) => {
  if (idx >= arr.length) idx = arr.length - 1

  while (idx > -1 && (arr[idx] === null || arr[idx] === undefined)) idx--

  return arr[idx]
}

const parsePropValue = (
  value: ScalePropElement,
): [ScalePropElement, boolean] => {
  const isNumber = typeof value === 'number'
  const isNegative = isNumber
    ? (value as number) < 0
    : (value as string)[0] === '-'
  const baseValue = isNegative
    ? isNumber
      ? -(value as number)
      : (value as string).slice(1)
    : value

  return [baseValue, isNegative]
}

const negate = (v: ScalePropElement) => (typeof v === 'number' ? -v : '-' + v)

const parseProp = (prop: ScaleProp, theme: Theme, config: ScaleConfig) => {
  const scaleName = config.scale || `${config.systemProp}Scales`
  const scale =
    (theme[scaleName] as ThemeScale | undefined) || config.defaultScale
  if (!scale) return prop

  if (Array.isArray(prop)) {
    const result = []
    const count = (theme.breakpoints || DEFAULT_BREAKPOINTS).length + 1

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

export interface Parser {
  (props: Props): Props
  configs: ScaleConfigs
}

export const scales = (configs: ScaleConfigs) => {
  const parse: Parser = props => {
    const propKeys = Object.keys(props)
    const systemProps: Props = {}
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

  return parse
}

export const composeScales = (...parsers: Parser[]) => {
  const configs = {}

  for (let i = 0; i < parsers.length; i++)
    Object.assign(configs, parsers[i].configs)

  return scales(configs)
}

type StyledSystemParser = (props: Props) => Props

export const interceptScales = (scaleParser: Parser) => (
  systemParser: StyledSystemParser,
) => (props: Props) => systemParser(scaleParser(props))
