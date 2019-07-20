# Helpers

Writing scales for your theme manually is ugly and time consuming. Why not
automate it?

```js
import { linearScale } from 'styled-system-scale'

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
    small: linearScale(3, 3),
    base: linearScale(4, 7),
    large: linearScale(8, 11),
  },
}
```

This results in a theme like the following:

```json
{
  "breakpoints": ["40rem", "52rem", "64rem"],
  "space": ["0rem", "0.25rem", "0.5rem", "0.75rem", "...", "10rem"],
  "spaceScales": {
    "small": [0, 1, 2, 3],
    "base": [2, 3, 4, 5],
    "large": [4, 5, 6, 7]
  },
  "fontSizes": ["0rem", "0.25rem", "0.5rem", "0.75rem", "...", "10rem"],
  "fontSizeScales": {
    "small": [0, 1, 2, 3],
    "base": [1, 2, 3, 4],
    "large": [4, 5, 6, 7]
  }
}
```

## Linear scale helper

Returns an array of values corresponding to a linear scale. This can be used to
create scales in your theme.

Note: This helper is built using the lower-level `scale` and `linearScaleGen`
helpers. If the `linearScale` helper does not fit your needs, a combination of
`scale` and `linearScaleGen` or `modularScaleGen` might be a better fit.

```js
import { linearScale } from 'styled-system-scale'

export const theme = {
  space: linearScale('0rem', '10rem', { ratio: 0.25 }),
  spaceScales: {
    base: linearScale(4, 8),
  },
}
```

`linearScale` takes the following arguments:

```sh
linearScale(min, max, opts = { count, ratio, precision, unit, min, max, transform })
```

- `min`: The starting value of the scale. This can include the unit. E.g. `1` or
  `1rem`.
- `max`: The ending value of the scale. This can include the unit. E.g. `10` or
  `10rem`.
- `opts`: Options to adjust the scale. These values are passed to the `scale`
  helper.
  - `count`: The number of elements in the scale. If `count` is defined, `ratio`
    cannot be defined.
  - `ratio`: The amount between values in the scale. If `ratio` is defiend,
    `count` cannot be defined.
  - `precision`: Number precision of the scale values. For example, a precision
    of `10` would allow values of `1.2` while a precision of `100` would allow
    `1.15`.
  - `unit`: Unit to append to values in the scale. E.g. `rem`.
  - `min`: Minimum value for any value in the scale.
  - `max`: Maximum value for any value in the scale.
  - `transform`: Function used to transform a value returned by the scale.
    Provided three arguments: `value` without a unit, `index`, and `count`. E.g.
    `Math.ceil` or `Math.floor`.

## Scale helper

Returns an array of values corresponding to a scale. This can be used to create
scales in your theme.

```js
import { scale, modularScaleGen } from 'styled-system-scale'

export const theme = {
  space: scale(10, modularScaleGen(0, 2)),
  // => [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
}
```

`scale` takes the following arguments:

```sh
scale(count = 0, gen = linearScaleGen(), opts = { min, max, transform })
```

- `count`: Length of the resulting array.
- `gen`: Generator function that returns sequenced scale values.
- `opts`: Options to adjust the scale.
  - `unit`: Unit to append to values in the scale. E.g. `rem`.
  - `min`: Minimum value for any value in the scale.
  - `max`: Maximum value for any value in the scale.
  - `transform`: Function used to transform a value returned by `gen`. Provided
    three arguments: `value`, `index`, and `count`. E.g. `Math.ceil` or
    `Math.floor`.

## Modular scale generator

A generator function that returns values on a modular scale.

```js
import { modularScaleGen } from 'styled-system-scale'

scale(5, modularScaleGen(0, 2))
// => [1, 2, 4, 8, 16]
```

`modularScaleGen` takes the following arguments:

```sh
modularScaleGen(initial = 0, ratio = 2, precision = 10)
```

- `initial`: Starting value for the scale.
- `ratio`: Ratio used to increment the scale. Note that the ratio is applied to
  the value index, not the previous value.
- `precision`: Number precision of the scale values. For example, a precision of
  `10` would allow values of `1.2` while a precision of `100` would allow
  `1.15`.

## Linear scale generator

A generator function that returns values on a linear scale.

```js
import { linearScaleGen } from 'styled-system-scale'

scale(5, linearScaleGen(0, 0.5))
// => [0, 0.5, 1, 1.5, 2]
```

`linearScaleGen` takes the following arguments:

```sh
linearScaleGen(initial = 0, ratio = 1, precision = 10)
```

- `initial`: Starting index for the scale.
- `ratio`: Ratio used to increment the scale. Note that the ratio is applied to
  the value index, not the previous value.
- `precision`: Number precision of the scale values. For example, a precision of
  `10` would allow values of `1.2` while a precision of `100` would allow
  `1.15`.

## Linear ratio helper

Returns a ratio to be used with `linearScaleGen` if two values on the scale are
known.

```js
import { linearRatio, linearScaleGen } from 'styled-system-scale'

const ratio = linearRatio(4, 8)
scale(5, linearScaleGen(0, ratio))
// => [0, 4, 8, 12, 16]
```

`linearRatio` takes the following arguments:

```sh
linearRatio(min, max, steps = 1)
```

- `min`: Left-most value of the two known values on the scale.
- `max`: Right-most value of the two known values on the scale.
- `steps`: Number of steps to take from `min` to `max` on the scale. For
  example, if you know there are three values between the two known values,
  `steps` should be `4`.

## Negate scale helper

Returns scale with negative values.

```js
import { negateScale } from 'styled-system-scale'

negateScale(['1rem', '-2rem', '4rem'])
// => ['-1rem', '2rem', '-4rem']
```

`negateScale` takes the following arguments:

```sh
negateScale(scale)
```

- `scale`: Scale to negate. Values can have units.

## Add scales helper

Returns a new scale by adding pairs from two scales.

```js
import { addScales } from 'styled-system-scale'

addScales(['1rem', '2rem', '3rem'], [null, '3rem'])
// => ['1rem', '5rem', '3rem']
```

`addScales` takes the following arguments:

```sh
addScales(a, b)
```

- `a`: Base scale. Values can have units.
- `b`: Scale to add. Values can have units.

## Subtract scales helper

Returns a new scale by subtracting pairs from two scales.

```js
import { subtractScales } from 'styled-system-scale'

subtractScales(['1rem', '2rem', '3rem'], [null, '3rem'])
// => ['1rem', '-1rem', '3rem']
```

`subtractScales` takes the following arguments:

```sh
subtractScales(a, b)
```

- `a`: Base scale. Values can have units.
- `b`: Scale to subtract. Values can have units.

## Merge scales helpers

Returns a new scale by merging scale values from two scales. Both left and right
directional merging functions are available. Undefined values in the non-base
scale are skipped.

```js
import { mergeScalesLeft, mergeScalesRight } from 'styled-system-scale'

mergeScalesLeft([0, 2, 4], [1, null, undefined])
// => [1, null, 4]

mergeScalesRight([0, undefined, 4], [1, null, undefined])
// => [0, null, 4]
```

`mergeScalesLeft` takes the following arguments:

```sh
mergeScalesLeft(a, b)
```

- `a`: Base scale.
- `b`: Scale to merge into `a`. `undefined` values are skipped.

`mergeScalesRight` takes the following arguments:

```sh
mergeScalesLeft(a, b)
```

- `a`: Scale to merge into `b`. `undefined` values are skipped.
- `b`: Base scale.
