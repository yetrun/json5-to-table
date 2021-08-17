const test = require('ava')
const parseToSchema = require('../../lib/parseToSchema/stack')

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
    { title: 'b', path: 'b', props: [
      { title: 'b1', path: 'b1' },
      { title: 'b2', path: 'b2' }
    ] },
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
    { title: 'b', path: 'b', props: [
      { title: 'b1', path: 'b1' },
      { title: 'b2', path: 'b2' },
      { title: 'b3', path: 'b3' }
    ] }
  ])
})

// 一个属性是数组，另一个属性是空数组
test('issue 11', t => {
  const data = [
    {
      "a": 1,
      "b": [
        {
          "c": 2,
          "d": 3
        }
      ]
    },
    {
      "a": 4,
      "b": []
    }
  ] 

  const schema = parseToSchema(data)
  t.deepEqual(schema, [
    { title: 'a', path: 'a' },
    { title: 'b', path: 'b', props: [
      { title: 'c', path: 'c' },
      { title: 'd', path: 'd' }
    ]}
  ])
})
