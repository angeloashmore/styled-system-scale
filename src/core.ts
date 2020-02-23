import { Theme as StyledSystemTheme } from 'styled-system'

import 'regenerator-runtime/runtime'

type Props = Record<any, any>

/** The most basic value of a styled-system-scale prop. */
type ScalePropElement = string | number | undefined

/** A value of a styled-system-scale prop. */
type ScaleProp = ScalePropElement | ScalePropElement[]

/** Theme values for a styled-system-scale prop */
type ScaleTheme = Record<any, ScalePropElement[]>

export interface Theme extends StyledSystemTheme {
  breakpoints?: string[]
  [key: string]: unknown
}

/**
 * Configuration to create a scale prop.
 */
export interface ScaleConfig {
  /** Prop name to assign scale values to the underlying component. */
  systemProp: string
  /** Name of the scale in the theme. Defaults to "${`systemProp`}Scales". */
  scale?: string
  /** Default scale to use if the theme does not have the scale. */
  defaultScale?: ScaleTheme
}

/**
 * Collection of scale configuration objects. The key of each configuration
 * determines the prop name the intercept.
 *
 * For example, a key of `marginScale` will tell `styled-system-scale` to treat
 * the `marginScale` prop as a scale prop.
 *
 * @example
 * The following example creates a parser for a `marginScale` prop.
 * {
 *   marginScale: {
 *     systemProp: 'margin',
 *     scale: 'space',
 *     defaultScale: [0, 2, 4, 8, 16]
 *   }
 * }
 */
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
    (theme[scaleName] as ScaleTheme | undefined) || config.defaultScale
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

/**
 * Parses the props of a Component and transforms their values if configured to
 * be a scale prop.
 */
export interface Parser {
  (props: Props): Props
  configs: ScaleConfigs
}

/**
 * Creates a Parser using the provided scale prop configurations.
 *
 * @param configs Collection of scale configuration objects. The key of each
 * configuration determines the prop name the intercept.
 *
 * @returns A prop Parser to pass to `interceptScales`.
 */
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

/**
 * Combines multiple Parsers into a single Parser.
 *
 * @param parsers Parsers to combine.
 *
 * @returns A Parser with the configs of all provided Parsers.
 */
export const composeScales = (...parsers: Parser[]) => {
  const configs = {}

  for (let i = 0; i < parsers.length; i++)
    Object.assign(configs, parsers[i].configs)

  return scales(configs)
}

type StyledSystemParser = (props: Props) => Props

/**
 * Intercepts a Component's props and transforms their values using the
 * provided Parser.
 *
 * The functionality of the interceptor is similar to the concept of
 * middleware.
 *
 * @example
 * const scales = composeScales(typographyScales, spaceScales)
 * const interceptor = interceptScales(scales)
 * const Comp = styled('div')(interceptor(compose(typography, space)))
 *
 * @param parser Parser used when intercepting props.
 *
 * @returns A function that accepts a `styled-system` parser.
 */
export const interceptScales = (parser: Parser) => (
  styledSystemParser: StyledSystemParser,
) => (props: Props) => styledSystemParser(parser(props))
