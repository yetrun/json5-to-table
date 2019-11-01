const test = require('ava')
const generateCells = require('../lib/generateBodyCells')
const { AddressableCells } = require('../lib/table_defs')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const cells = generateCells(data, props)
  t.deepEqual(cells, AddressableCells( 
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 }
  ))
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
  t.deepEqual(cells, AddressableCells(
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 1, c: 4, v: 4 }
  ))
})

test('array generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const cells = generateCells(data, props)
  t.deepEqual(cells, AddressableCells(
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 2, c: 1, v: 4 },
    { r: 2, c: 2, v: 5 },
    { r: 2, c: 3, v: 6 }
  ))
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
  t.deepEqual(cells, AddressableCells(    
    { r: 1, c: 1, rs: 2, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 1, c: 4, rs: 2, v: 6 },
    { r: 2, c: 2, v: 4 },
    { r: 2, c: 3, v: 5 }
  ))
})

test('two nested array generate', t => {
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
  const data = {
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

  const cells = generateCells(data, props)
  t.deepEqual(cells, AddressableCells(    
    { r: 1, c: 1, rs: 3, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 2, c: 2, v: 4 },
    { r: 2, c: 3, v: 5 },
    { r: 1, c: 4, v: 6 },
    { r: 1, c: 5, v: 7 },
    { r: 1, c: 6, v: 8 },
    { r: 2, c: 4, v: 9 },
    { r: 2, c: 5, v: 10 },
    { r: 2, c: 6, v: 11 },
    { r: 3, c: 4, v: 12 },
    { r: 3, c: 5, v: 13 },
    { r: 3, c: 6, v: 14 }
  ))
})

test('more depth nested array generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [
        { 
          key: 'c',
          props: [ { key: 'd' }, { key: 'e' } ]
        },
        { key: 'f' }
      ]
    }
  ]
  const data = {
    a: 1,
    b: [
      {
        c: [
          { d: 2, e: 3 },
          { d: 4, e: 5 }
        ],
        f: 6
      },
      {
        c: {
          d: 7, e: 8
        },
        f: 9
      }
    ]
  }

  const cells = generateCells(data, props)
  t.deepEqual(cells, AddressableCells(    
    { r: 1, c: 1, rs: 3, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 2, c: 2, v: 4 },
    { r: 2, c: 3, v: 5 },
    { r: 1, c: 4, rs: 2, v: 6 },
    { r: 3, c: 2, v: 7 },
    { r: 3, c: 3, v: 8 },
    { r: 3, c: 4, v: 9 }
  ))
})
