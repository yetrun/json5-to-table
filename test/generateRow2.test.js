// TODO: 如果语法错误没有具体的报错
const test = require('ava')
const generateRow = require('../lib/generateRow2')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const row = generateRow(data, props)
  t.deepEqual(row, [ 1, 2, 3 ])
})

test('nested generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]
  const data = { a: 1, b: { c: 2, d: 3 }, e: 4 }

  const cells = generateRow(data, props)
  t.deepEqual(cells, [
    1,
    [2, 3],
    4
  ])
})

test('array generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const cells = generateRow(data, props)
  t.deepEqual(cells, [
    [1, 2, 3],
    [4, 5, 6]
  ])
})

test('nested array generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]
  const data = {
    a: 1,
    b: [
      { c: 2, d: 3 },
      { c: 4, d: 5 }
    ],
    e: 6
  }

  const cells = generateRow(data, props)
  t.deepEqual(cells, [
    1,
    [
      [2, 3],
      [4, 5]
    ],
    6
  ])
})
