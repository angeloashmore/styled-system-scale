# API

## `scale`

```js
import { scale } from 'styled-system-scale'

scale(count, gen, opts)
```

Returns an array of values corresponding to the specified scale.

- **`count`** (Default: 0) - Cardinality of the resulting array.
- **`gen`** (Default: `linearScale()`) - Generator function that returns
  sequenced scale values.
- **`opts`** - Options to adjust the scale.
  - **`min`** (Default: `-Infinity`) - Minimum value for any value in the scale.
  - **`max`** (Default: `Infinity`) - Maximum value for any value in the scale.
  - **`transform`** (Default: `identity`) - Function used to transform a value
    returned by `gen`. Provided three arguments: `value`, `index`, and `count`.
    E.g. `Math.ceil` or `Math.floor`.
