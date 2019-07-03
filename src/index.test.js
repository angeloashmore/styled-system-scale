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
  space: linearScale(0, 10, { count: 41 }),
  spaceScales: {
    small: linearScale(1, 4),
    base: linearScale(4, 7),
    large: linearScale(8, 11),
  },
  fontSizes: linearScale('1rem', '6rem', { count: 24, precision: 100 }),
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

test.skip('provides responsive values to style prop', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Comp
        fontSizeScale={['medium', null, 'large']}
        pb={2}
        ptScale="medium"
        pxScale="large"
      />
    </ThemeProvider>,
  )

  expect(tree).toMatchSnapshot()
})
