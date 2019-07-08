# Styled System Scale

Responsive, theme-based scale props for automatically applying scale values to
[Styled System][styled-system].

[![npm version](https://flat.badgen.net/npm/v/styled-system-scale)](https://www.npmjs.com/package/styled-system-scale)
[![Build Status](https://flat.badgen.net/travis/angeloashmore/styled-system-scale)](https://travis-ci.com/angeloashmore/styled-system-scale)

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
  breakpoints: linearScale('40rem', '64rem', { count: 3 }),
  space: linearScale('0rem', '10rem', { ratio: 0.25 }),
  spaceScales: {
    small: linearScale(0, 3),
    base: linearScale(2, 5),
    large: linearScale(4, 7),
  },
  fontSizes: linearScale('0rem', '10rem', { ratio: 0.25 }),
  fontSizeScales: {
    small: linearScale(3, 4),
    base: linearScale(4, 7),
    large: linearScale(6, 9),
  },
}
```

With the theme in place, scale props can be used to provide values to the Styled
System props.

```jsx
// margin with responsive values from theme.spaceScales.medium
<Box mScale="large" />

// padding-bottom with responsive values from theme.spaceScales.base
<Box pbScale="base" />

// fontSize with responsive values from theme.fontSizeScales.small
<Box fontSizeScale="small" />
```

# Docs

- [Getting Started](./docs/getting-started.md)
- [Helpers API](./docs/helpers.md)
- [Reference Table](./docs/reference-table.md)

[styled-system]: https://github.com/styled-system/styled-system
