import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-emotion'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { compose, typography, space } from 'styled-system'

import { interceptScales, composeScales } from './core'
import { typographyScales } from './presets/typography'
import { spaceScales } from './presets/space'

import { scale, linearScale } from './helpers'

expect.addSnapshotSerializer(serializer)

const theme = {
  breakpoints: ['1rem', '2rem', '3rem'],
  fontSizes: scale(10, linearScale()),
  fontSizeScales: {
    medium: scale(4, linearScale()),
    large: scale(4, linearScale(10)),
  },
  space: scale(20, linearScale(0, 0.25, 100)),
  spaceScales: {
    medium: scale(4, linearScale()),
    large: scale(4, linearScale(10)),
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

test('provides responsive values to style prop', () => {
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
