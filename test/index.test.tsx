import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-emotion'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import {
  compose,
  typography,
  space,
  TypographyProps,
  SpaceProps,
} from 'styled-system'

import {
  interceptScales,
  composeScales,
  typographyScales,
  spaceScales,
  linearScale,
  TypographyScaleProps,
  SpaceScaleProps,
} from '../src'

expect.addSnapshotSerializer(serializer)

const theme = {
  breakpoints: linearScale('40rem', '64rem', { count: 3 }),
  space: linearScale('0rem', '20rem', { difference: 0.25 }),
  spaceScales: {
    small: linearScale(1, 4),
    base: linearScale(4, 7),
    large: linearScale(8, 11),
  },
  fontSizes: linearScale('1rem', '6rem', { difference: 0.25 }),
  fontSizeScales: {
    small: linearScale(0, 3),
    base: linearScale(1, 4),
    large: linearScale(8, 11),
  },
}

type Theme = typeof theme

const scales = composeScales(typographyScales, spaceScales)
const interceptor = interceptScales(scales)

const Comp = styled.div<
  TypographyProps<Theme> &
    TypographyScaleProps<Theme> &
    SpaceProps<Theme> &
    SpaceScaleProps<Theme>
>(interceptor(compose(typography, space)))

test('theme', () => {
  expect(theme).toMatchSnapshot()
})

test('provides responsive values to style prop', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Comp
        fontSizeScale={['base', null, 'large']}
        pb={2}
        ptScale="base"
        pxScale="large"
      />
    </ThemeProvider>,
  )

  expect(tree).toMatchSnapshot()
})
