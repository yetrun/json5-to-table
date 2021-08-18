const test = require('ava')
const retrieveProperty = require('../../lib/helpers/retrieveProperty')

test('retrieve simple property', t => {
  const value = retrieveProperty({ a:1, b: 2 }, 'a')
  t.is(value, 1)
})

test('retrieve nested property', t => {
  const value = retrieveProperty({ a: { b: { c: 1 } } }, 'a.b.c')
  t.is(value, 1)
})

test('retrieve from array', t => {
  const value = retrieveProperty([
    { a: 1, b: 2 },
    { a: 3, b: 4 }
  ], 'a')
  t.deepEqual(value, [1, 3])
})

test('retrieve from deepin array', t => {
  const value = retrieveProperty({
    a: [
      { b: 1, c: 2 },
      { b: 3, c: 4 }
    ]
  }, 'a.b')
  t.deepEqual(value, [1, 3])
})
