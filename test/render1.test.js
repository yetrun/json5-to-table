import test from 'ava'
import Render1 from '../lib/Render1'

test('simple render', t => {
  const render = new Render1()
  const head = {
    keys: ['a', 'b', 'c']
  }
  const data = [
    { a: 1, b: 2, c: 3, d: 0 },
    { a: 4, b: 5, c: 6, d: 0 }
  ]

  render.init(data, head)
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
