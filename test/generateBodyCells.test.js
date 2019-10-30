// TODO: 如果语法错误没有具体的报错
const test = require('ava')
const generateCells = require('../lib/generateBodyCells')
const { AddressableCell } = require('../lib/table_defs')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const cells = generateCells(data, props)
  t.deepEqual(cells, [
    new AddressableCell({ r: 1, c: 1, v: 1 }),
    new AddressableCell({ r: 1, c: 2, v: 2 }),
    new AddressableCell({ r: 1, c: 3, v: 3 })
  ])
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

  const cells = generateCells(data, props)
  t.deepEqual(cells, [
    new AddressableCell({ r: 1, c: 1, v: 1 }),
    new AddressableCell({ r: 1, c: 2, v: 2 }),
    new AddressableCell({ r: 1, c: 3, v: 3 }),
    new AddressableCell({ r: 1, c: 4, v: 4 })
  ])
})

test('array generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const cells = generateCells(data, props)
  t.deepEqual(cells, [
    new AddressableCell({ r: 1, c: 1, v: 1 }),
    new AddressableCell({ r: 1, c: 2, v: 2 }),
    new AddressableCell({ r: 1, c: 3, v: 3 }),
    new AddressableCell({ r: 2, c: 1, v: 4 }),
    new AddressableCell({ r: 2, c: 2, v: 5 }),
    new AddressableCell({ r: 2, c: 3, v: 6 })
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

  const cells = generateCells(data, props)
  t.deepEqual(cells, [
    new AddressableCell({ r: 1, c: 1, rs: 2, v: 1 }),
    new AddressableCell({ r: 1, c: 2, v: 2 }),
    new AddressableCell({ r: 1, c: 3, v: 3 }),
    new AddressableCell({ r: 1, c: 4, rs: 2, v: 6 }),
    new AddressableCell({ r: 2, c: 2, v: 4 }),
    new AddressableCell({ r: 2, c: 3, v: 5 })
  ])
})
