const Benchmark = require('benchmark')

const published = require('styled-system-scale')
const master = require('../dist/index.cjs')

const theme = {
  breakpoints: ['32em', '48em', '64em'],
  spaceScales: {
    small: ['0rem', '1rem', '2rem', '3rem'],
    large: ['10rem', '11rem', '12rem', '13rem'],
  },
}

const tests = [
  {
    name: 'space',
    libs: {
      published: published.spaceScales,
      master: master.spaceScales,
    },
    run: fn => () =>
      fn({
        theme,
        mScale: ['small', null, 'large'],
        pxScale: 'large',
        pyScale: '-large',
      }),
  },
]

const suite = new Benchmark.Suite()

tests.forEach(test => {
  console.log(test.name)
  Object.keys(test.libs).forEach(key => {
    const fn = test.libs[key]
    const t = test.run(fn)
    // debugging
    console.log(key, t())
    suite.add(`${test.name}: ${key}`, t)
  })
})

suite
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function onComplete() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run({ async: true })
