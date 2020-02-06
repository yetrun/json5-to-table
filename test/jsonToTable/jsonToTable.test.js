const test = require('../test')
const jsonToTable = require('../../lib/jsonToTable/jsonToTable')
const { AddressableCells } = require('../../lib/jsonToTable/table_defs')

test('generate simple table', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const rows = jsonToTable(data, props)
  t.deepEqual(rows, [
    new AddressableCells(
      { r: 1, c: 1, v: 'a' },
      { r: 1, c: 2, v: 'b' },
      { r: 1, c: 3, v: 'c' }
    ),
    new AddressableCells( 
      { r: 2, c: 1, v: 1 },
      { r: 2, c: 2, v: 2 },
      { r: 2, c: 3, v: 3 }
    ),
    new AddressableCells( 
      { r: 3, c: 1, v: 4 },
      { r: 3, c: 2, v: 5 },
      { r: 3, c: 3, v: 6 }
    )
  ])
})

test('generate complex table', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]
  const data = [
    {
      a: 1,
      b: [
        { c: 2, d: 3 },
        { c: 4, d: 5 }
      ],
      e: 6
    },
    {
      a: 11,
      b: [
        { c: 12, d: 13 },
        { c: 14, d: 15 }
      ],
      e: 16
    }
  ]

  const rows = jsonToTable(data, props)
  t.is(rows.length , 3)
  t.deepEqual(rows[0], new AddressableCells(
    { r: 1, c: 1, rs: 2, v: 'a' },
    { r: 1, c: 2, cs: 2, v: 'b' },
    { r: 1, c: 4, rs: 2, v: 'e' },
    { r: 2, c: 2, v: 'c' },
    { r: 2, c: 3, v: 'd' }
  ))
  t.deepEqual(rows[1], new AddressableCells(    
    { r: 3, c: 1, rs: 2, v: 1 },
    { r: 3, c: 2, v: 2 },
    { r: 3, c: 3, v: 3 },
    { r: 3, c: 4, rs: 2, v: 6 },
    { r: 4, c: 2, v: 4 },
    { r: 4, c: 3, v: 5 }
  ))
})

test('generate with merged cells', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'd' }, { key: 'e' } ]
    },
    { 
      key: 'c', 
      props: [ { key: 'd' }, { key: 'e' }, { key: 'f' } ]
    }
  ]
  const data = [
    {
      a: 1,
      b: [
        { d: 2, e: 3 },
        { d: 4, e: 5 }
      ],
      c: [
        { d: 6, e: 7, f: 8 },
        { d: 9, e: 10, f: 11 },
        { d: 12, e: 13, f: 14 }
      ]
    }
  ]

  const rows = jsonToTable(data, props)
  t.deepEqual(rows[1], new AddressableCells(
    { r: 3, c: 1, rs: 3, v: 1 },
    { r: 3, c: 2, v: 2 },
    { r: 3, c: 3, v: 3 },
    { r: 4, c: 2, v: 4 },
    { r: 4, c: 3, v: 5 },
    { r: 3, c: 4, v: 6 },
    { r: 3, c: 5, v: 7 },
    { r: 3, c: 6, v: 8 },
    { r: 4, c: 4, v: 9 },
    { r: 4, c: 5, v: 10 },
    { r: 4, c: 6, v: 11 },
    { r: 5, c: 2, cs: 2 },
    { r: 5, c: 4, v: 12 },
    { r: 5, c: 5, v: 13 },
    { r: 5, c: 6, v: 14 }
  ))
})

test('generate with title', t => {
  const props = [ 
    { key: 'a', title: 'A' },
    { key: 'b', title: 'B' },
    { key: 'c', title: 'C' } 
  ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const rows = jsonToTable(data, props)
  t.deepEqual(rows, [
    new AddressableCells(
      { r: 1, c: 1, v: 'A' },
      { r: 1, c: 2, v: 'B' },
      { r: 1, c: 3, v: 'C' }
    ),
    new AddressableCells( 
      { r: 2, c: 1, v: 1 },
      { r: 2, c: 2, v: 2 },
      { r: 2, c: 3, v: 3 }
    ),
    new AddressableCells( 
      { r: 3, c: 1, v: 4 },
      { r: 3, c: 2, v: 5 },
      { r: 3, c: 3, v: 6 }
    )
  ])
})

test('generate with simple string define', t => {
  const props = ['a', 'b', 'c']
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const rows = jsonToTable(data, props)
  t.deepEqual(rows, [
    new AddressableCells(
      { r: 1, c: 1, v: 'a' },
      { r: 1, c: 2, v: 'b' },
      { r: 1, c: 3, v: 'c' }
    ),
    new AddressableCells( 
      { r: 2, c: 1, v: 1 },
      { r: 2, c: 2, v: 2 },
      { r: 2, c: 3, v: 3 }
    ),
    new AddressableCells( 
      { r: 3, c: 1, v: 4 },
      { r: 3, c: 2, v: 5 },
      { r: 3, c: 3, v: 6 }
    )
  ])
})
