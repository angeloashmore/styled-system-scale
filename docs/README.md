# Styled System Scale

Responsive, theme-based scale props for automatically applying scale values to
[`styled-system`][styled-system].

```sh
npm i styled-system-scale
```

# Usage

```js
// Example uses styled-components, but styled-system-scale works with anything
// styled-system supports, including emotion.
import styled from 'styled-components'
import { space, typography, compose } from 'styled-system'
import {
  spaceScales,
  typographyScales,
  composeScales,
  interceptScales,
} from 'styled-system-scale'

const scales = composeScales(spaceScales, typographyScales)

const Box = styled.div(
  interceptScales(scales)(
    compose(
      space,
      typography,
    ),
  ),
)
```

Styled System Scale requires providing "scales" for each scale prop. For
example, the following theme sets up space and font size scales.

```js
const theme = {
  breakpoints: [40, 52, 64].map(x => x + 'rem'),
  space: scale(12, modularScale()),
  spaceScales: {
    small: scale(4, linearScale()),
    base: scale(4, linearScale(4)),
    large: scale(4, linearScale(8)),
  },
  fontSizes: scale(10, modularScale()),
  fontSizeScales: {
    small: scale(4, linearScale()),
    base: scale(4, linearScale(1)),
    large: scale(4, linearScale(4)),
  },
}
```

With the theme in place, the scale props can be used to provide values to the
Styled System props.

```jsx
// margin with responsive values from theme.spaceScales.medium
<Box mScale="medium" />

// fontSize with responsive values from theme.fontSizeScales.large
<Box fontSizeScale="large" />
```

# Docs

- TODO: Getting Started
- [Helpers API](./docs/helpers.md)

[styled-system]: https://github.com/styled-system/styled-system
