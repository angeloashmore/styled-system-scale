# API

## Scale helper

Returns an array of values corresponding to a scale. This can be used to create
scales in your theme.

```js
import { scale, modularScale } from 'styled-system-scale'

export const theme = {
  space: scale(20, modularScale(0, 2)),
}
```

`scale` takes the following arguments:

```sh
scale(count = 0, gen = linearScale(), opts = { min = -Infinity, max = Infinity, transform = identity })
```

- `count`: Length of the resulting array.
- `gen` - Generator function that returns sequenced scale values.
- `opts` - Options to adjust the scale.
  - `min` - Minimum value for any value in the scale.
  - `max` - Maximum value for any value in the scale.
  - `transform` - Function used to transform a value returned by `gen`. Provided
    three arguments: `value`, `index`, and `count`. E.g. `Math.ceil` or
    `Math.floor`.

## Linear scale helper

A generator function that returns values on a linear scale.

```js
import { linearScale } from 'styled-system-scale'

scale(5, linearScale(0, 0.5))
// => [0, 0.5, 1, 1.5, 2]
```

`linearScale` takes the following arguments:

```sh
linearScale(initial = 0, ratio = 1, precision = 10)
```

- `initial`: Starting index for the scale.
- `ratio`: Ratio used to increment the scale.
- `precision`: Number precision of the scale values. For example, a precision of
  `10` would allow values of `1.2` while a precision of `100` would allow
  `1.15`.

## Linear ratio helper

Returns a ratio to be used with `linearRatio` if two values on the scale are
known.

```js
import { linearRatio, linearScale } from 'styled-system-scale'

const ratio linearRatio(4, 8)
scale(5, linearScale(0, ratio))
// => [0, 4, 8, 12, 16]
```

`linearRatio` takes the following arguments:

```sh
linearRatio(min, max, steps = 1)
```

- `min`: Left-most value of the two known values on the scale.
- `max`: Right-most value of the two known values on the scale.
- `steps`: Number of steps between the two know values. For example, if you know
  there are two values between the two know values, `steps` should be `3`.

## Modular scale helper

A generator function that returns values on a modular scale.

```js
import { modularScale } from 'styled-system-scale'

scale(5, modularScale(0, 2))
// => [1, 2, 4, 8, 16]
```

`modularScale` takes the following arguments:

```sh
modularScale(initial = 0, ratio = 2, precision = 10)
```

- `initial`: Starting index for the scale.
- `ratio`: Ratio used to increment the scale.
- `precision`: Number precision of the scale values. For example, a precision of
  `10` would allow values of `1.2` while a precision of `100` would allow
  `1.15`.
