const test = require('ava')
const Render1 = require('../lib/Render1')

test('simple render', t => {
  const render = new Render1()
  const props = [
    { key: 'a' },
    { key: 'b' },
    { key: 'c' }
  ]
  const data = [
    { a: 1, b: 2, c: 3, d: 0 },
    { a: 4, b: 5, c: 6, d: 0 }
  ]

  render.init(data, props)
  t.deepEqual(render.next(), { value: [
    { r: 1, c: 1, v: 'a' },
    { r: 1, c: 2, v: 'b' },
    { r: 1, c: 3, v: 'c' }
  ], done: false })
  t.deepEqual(render.next(), { value: [
    { r: 2, c: 1, v: 1 },
    { r: 2, c: 2, v: 2 },
    { r: 2, c: 3, v: 3 }
  ], done: false })
  t.deepEqual(render.next(), { value: [
    { r: 3, c: 1, v: 4 },
    { r: 3, c: 2, v: 5 },
    { r: 3, c: 3, v: 6 }
  ], done: false })
  t.deepEqual(render.next(), { value: undefined, done: true })
})

test.skip('nested render', t => {
  const render = new Render1()
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'd' }, { key: 'e' } ]
    },
    { key: 'c' }
  ]
  const data = [
    { a: 1, b: { d: 2, e: 3 }, c: 4 },
    { a: 5, b: { d: 6, e: 7 }, c: 8 }
  ]

  render.init(data, props)
  t.deepEqual(render.next(), { value: [
    { r: 1, c: 1, rs: 2, cs: 1, v: 'a' },
    { r: 1, c: 2, rs: 1, cs: 2, v: 'b' },
    { r: 1, c: 4, rs: 2, cs: 1, v: 'c' },
    { r: 2, c: 2, v: 'd' },
    { r: 2, c: 3, v: 'e' }
  ], done: false })
  t.deepEqual(render.next(), { value: [
    { r: 2, c: 1, v: 1 },
    { r: 2, c: 2, v: 2 },
    { r: 2, c: 3, v: 3 },
    { r: 2, c: 4, v: 4 }
  ], done: false })
  t.deepEqual(render.next(), { value: [
    { r: 3, c: 1, v: 5 },
    { r: 3, c: 2, v: 6 },
    { r: 3, c: 3, v: 7 },
    { r: 3, c: 4, v: 8 }
  ], done: false })
  t.deepEqual(render.next(), { value: undefined, done: true })
})
