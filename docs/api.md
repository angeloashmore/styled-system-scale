# API

## Scales

To create custom scale props for Styled System props, use the `scales` low-level
utility. The `scales` function takes a configuration object as its only argument
and returns a scale function that can be used like any other Styled System Scale
function. Each key in the configuration object can define the following:

- `systemProp`: the Styled System prop to use in the returned props object
- `scale`: a string referencing a key in the `theme` object

```js
import styled from 'styled-components'
import { typography } from 'styled-system'
import { scales, interceptScales } from 'styled-system-scale'

const Box = styled.div(
  interceptScales(
    scales({
      fontSizeScale: {
        systemProp: 'fontSize',
        scale: 'fontSizeScales',
      },
    }),
  )(typography),
)
```

`Box` can not accept a `fontSizeScale` prop that maps a theme value in
`fontSizeScales` to the `fontSize` prop. Styled System will pick up the
`fontSize` prop and create the style object for `styled-components`.

## Compose

The `composeScales` utility works just like `styled-system`'s
[`compose`][styled-system-compose] utility. It combines multiple scale functions
together into one.

Note that `composeScales` and Styled System's `compose` is not the same as
`compose` from functional programming libraries like Lodash and Ramda.

```js
import styled from 'styled-components'
import { compose, space, typography } from 'styled-system'
import {
  composeScales,
  spaceScales,
  typographyScales,
  interceptScales,
} from 'styled-system-scale'

const scales = composeScales(spaceScales, typographyScales)

export const Box = styled.div(
  interceptScales(scales)(
    compose(
      space,
      typography,
    ),
  ),
)
```

## Intercept

In order for Styled System Scale to convert scale props to responsive arrays,
props passed to Styled System need to be intercepted and transformed using the
`interceptScales` function.

The `interceptScales` function takes in a scale parser function returned from
`composeScales` and a style parser function from Styled System's `compose`. The
return value can be passed directly to `styled` from `styled-components`,
`emotion`, etc.

See the example in [`Compose`](#compose) to see how `interceptScales` can be
used.

[styled-system-compose]: https://styled-system.com/api#compose
