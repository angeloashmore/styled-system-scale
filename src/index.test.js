import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-emotion'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { compose, typography, space } from 'styled-system'

import { interceptScales, composeScales } from './core'
import { typographyScales } from './presets/typography'
import { spaceScales } from './presets/space'

import { linearScale, scale, linearScaleGen } from './helpers'

expect.addSnapshotSerializer(serializer)

const theme = {
  breakpoints: linearScale('40rem', '64rem', { count: 3 }),
  space: linearScale('0rem', '20rem', { ratio: 0.25 }),
  spaceScales: {
    small: linearScale(1, 4),
    base: linearScale(4, 7),
    large: linearScale(8, 11),
  },
  fontSizes: linearScale('1rem', '6rem', { ratio: 0.25 }),
  fontSizeScales: {
    small: linearScale(0, 3),
    base: linearScale(1, 4),
    large: linearScale(8, 11),
  },
}

const scales = composeScales(typographyScales, spaceScales)

const Comp = styled('div')(
  interceptScales(scales)(
    compose(
      typography,
      space,
    ),
  ),
)

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
