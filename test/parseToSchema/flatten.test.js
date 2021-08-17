const test = require('ava')
const parseToSchema = require('../../lib/parseToSchema/flatten')

test('parse data to schema', t => {
  const data = {
    a: 1, b: 2, c: 3
  }

  const schema = parseToSchema(data)
  t.deepEqual(schema, [
    { title: 'a', path: 'a' },
    { title: 'b', path: 'b' },
    { title: 'c', path: 'c' }
  ])
})

test('parse nested data to schema', t => {
  const data = {
    a: 1, b: {
      b1: 2, b2: 3
    }, c: 4
  }

  const schema = parseToSchema(data)
  t.deepEqual(schema, [
    { title: 'a', path: 'a' },
    { title: 'b.b1', path: 'b.b1' },
    { title: 'b.b2', path: 'b.b2' },
    { title: 'c', path: 'c' }
  ])
})

test('parse array to schema', t => {
  const data = [
    { a: 1, b: 2 },
    { b: 3, c: 4 }
  ]

  const schema = parseToSchema(data)
  t.deepEqual(schema, [
    { title: 'a', path: 'a' },
    { title: 'b', path: 'b' },
    { title: 'c', path: 'c' }
  ])
})

test('parse nested array to schema', t => {
  const data = { 
    a: 1, b: [
      { b1: 2, b2: 3 },
      { b2: 4, b3: 5 }
    ] 
  }

  const schema = parseToSchema(data)
  t.deepEqual(schema, [
    { title: 'a', path: 'a' },
    { title: 'b.b1', path: 'b.b1' },
    { title: 'b.b2', path: 'b.b2' },
    { title: 'b.b3', path: 'b.b3' }
  ])
})
