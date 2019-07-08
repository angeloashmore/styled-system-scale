# Getting Started

Styled System Scale is designed to work with [Styled System][styled-system].
Before getting started with Styled System Scale, setup your project to use
Styled System.

See the official [Getting Started][styled-system-getting-started] guide for
details on using Styled System.

## Setting up scales

Working with scales for values such as spacing and font sizes can ease
development and promote consistent usage. Styled System supports defining scales
in the theme like the following:

```js
// theme.js

export default {
  space: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(x => x + 'rem'),
}
```

With `space` defined in the theme, components with the `space` Styled System
props will use those values when defining padding and margins.

```jsx
// padding-top, padding-bottom: '0.5rem'
// padding-left, padding-right: '1rem'
<Box py={1} px={2} />
```

To clean up the theme, we can use the `linearScale` Styled System Scale helper
to build the scale.

```js
// theme.js
import { linearScale } from 'styled-system-scale'

export default {
  space: linearScale('0rem', '5rem', { ratio: 0.5 }),
}
```

This will create the same scale we had before but in a more readable way. Note
that you can provide the start and end values with units.

The same strategy can be used to define font sizes in your theme.

```js
// theme.js

export default {
  fontSizes: linearScale('0.75rem', '6rem', { ratio: 0.25 }),
}
```

## Responsive scale props

When working on responsive websites and applications, values such as spacing and
font sizes usually require different values at different screen sizes. Styled
System provides an easy way to define responsive values using arrays.

In the following theme, three breakpoints and spacing values are defined.

```js
// theme.js

export default {
  breakpoints: linearScale('40rem', '64rem', { count: 3 })
  space: linearScale('0rem', '5rem', { ratio: 0.5 }),
}
```

Using the values responsively looks like the following.

```js
<Box
  p={[
    1, // 0.5rem below the smallest breakpoint (all viewports)
    4, // 2rem from the next breakpoint and up
    8, // 4rem from the next breakpoint and up
    12, // 6rem from the next breakpoint and up
  ]}
/>
```

Using the `[1, 4, 8, 12]` padding value is likely to be used elsewhere in your
app. Rather than manually keeping these values in sync, Styled System Scale
provides a way to define these responsive values in your theme.

```js
// theme.js

export default {
  breakpoints: linearScale('40rem', '64rem', { count: 3 })
  space: linearScale('0rem', '5rem', { ratio: 0.5 }),
  spaceScales: {
    // The following could also be written using the linearScale helper.
    base: [1, 4, 8, 12],
  },
}
```

Now we can reference the responsive scale using the `base` name.

```jsx
<Box pScale="base" />
```

This allows us to keep components using the same `space` values in sync in an
easy and maintainable way. If the values need to be changed, updating the theme
will update all components using the scale.

Your Styled System component will need to be updated to add the `pScale` prop,
and any other scale props needed, to your component.

```js
// Before, without styled-system-scale

import styled from 'styled-components'
import { space, typography, color, compose } from 'styled-system'

const Box = styled.div(
  compose(
    space,
    typography,
    color,
  ),
)
```

```js
// After, with styled-system-scale

import { space, typography, color, compose } from 'styled-system'
import {
  spaceScales,
  typographyScales,
  interceptScales,
  composeScales,
} from 'styled-system-scale'

const scales = composeScales(spaceScales, typographyScales)

const Box = styled.div(
  interceptScales(scales)(
    compose(
      space,
      typography,
      color,
    ),
  ),
)
```

The `spaceScales` and `typographyScales` imports automatically add scale props
that align with Styled System's `space` and `typography` prop categories.

For a complete list, see the [Reference Table][reference-table] of scale
functions.

[styled-system]: https://github.com/styled-system/styled-system
[styled-system-getting-started]: https://styled-system.com/getting-started/
[reference-table]: ./reference-table.md
