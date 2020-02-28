# How it Works

Styled System Scale allows you to pass responsive values from your theme to a
Styled System prop. Styled System continues to do the heavy lifting of providing
styles to your CSS-in-JS library.

In order to do this, Styled System Scale intercepts your component's props
before it gets to Styled System. The interceptor looks for props that match the
scale prop names, such as `fontSizeScale`, and transforms it into a value that
Styled System understands.

In the following example, the theme defines breakpoints, font sizes, and a
responsive font size scale named `large`.

```javascript
// theme.js

export default {
  breakpoints: linearScale('40rem', '64rem', { count: 3 })
  fontSizes: linearScale('0.75rem', '6rem', { difference: 0.25 }),
  fontSizeScales: {
    large: linearScale(5, 20, { count: 4 }),
  },
}
```

The following two examples provide equivalent font sizes.

```javascript
<Box fontSizeScale="large" />
<Box fontSize={[5, 10, 15, 20]} />
```

Styled System Scale sees the `fontSizeScale` prop and transforms it into the
`fontSize` prop seen above.

```javascript
// Incoming props for Box:
props = { fontSizeScale: 'large' }

// After interceptor processes props:
props = { fontSize: [5, 10, 15, 20], fontSizeScale: 'large' }
```

Note that the `fontSize` value is taken from `theme.fontSizeScales.large`.

Styled System uses the `fontSize` prop to create the style objects used by
`styled-components`, `emotion`, etc.

All props provided to the component are still passed to the underlying
component. This allows the component to accept a `fontSize` prop that overrides
the scale prop.
