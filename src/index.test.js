import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-emotion'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { compose, typography, color } from 'styled-system'

import { createStyleScaleFunction } from './index'
import { scale, linearScale } from './helpers'

expect.addSnapshotSerializer(serializer)

const theme = {
  breakpoints: ['1rem', '2rem', '3rem'],
  fontSizeScales: {
    medium: scale(4, linearScale()),
    large: scale(4, linearScale(10)),
  },
  fontSizes: scale(10, linearScale()),
  space: scale(10, linearScale(0, 0.25, 100)),
}

const fontSizeScale = createStyleScaleFunction({
  key: 'fontSizeScale',
  property: 'fontSize',
  scale: 'fontSizeScales',
})

describe('createStyleScaleFunction', () => {
  test('returns a style scale function', () => {
    const systemProps = fontSizeScale({
      theme,
      fontSizeScale: 'medium',
    })

    expect(systemProps).toEqual({ fontSize: [0, 1, 2, 3] })
  })

  test('supports responsive scales', () => {
    const systemProps = fontSizeScale({
      theme,
      fontSizeScale: ['medium', null, 'large'],
    })

    expect(systemProps).toEqual({ fontSize: [0, 1, 12, 13] })
  })
})

describe('integration', () => {
  // const CompBase = styled('div', { shouldForwardProp: () => true })(fontSize)
  // const Comp = props => {
  //   const scaledProps = fontSizeScale({ theme, ...props })

  //   return <CompBase {...scaledProps} {...props} />
  // }

  const Comp = styled('div', { shouldForwardProp: () => true })(
    scaled(
      composeScales(fontSizeScale, spaceScale),
      compose(
        typography,
        space,
      ),
    ),
  )

  test('provides responsive values to style prop', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <Comp fontSizeScale={['medium', null, 'large']} />,
      </ThemeProvider>,
    )

    expect(tree).toMatchSnapshot()
  })
})
