const test = require('../test')
const normalizeProps = require('../../lib/jsonToTable/normalizeProps')
const generateBodyCells = require('../../lib/jsonToTable/generateBodyCells')
const { AddressableCells } = require('../../lib/jsonToTable/table_defs')

function generateCells (data, props, ...params) {
  return generateBodyCells(
    data,
    normalizeProps(props),
    ...params
  )
}

test('object', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const cells = generateCells(data, props)
  t.deepEqual(cells, new AddressableCells( 
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 }
  ))
})

test('object -> object', t => {
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
  t.deepEqual(cells, new AddressableCells(
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 1, c: 4, v: 4 }
  ))
})

test('array', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const cells = generateCells(data, props)
  t.deepEqual(cells, new AddressableCells(
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 2, c: 1, v: 4 },
    { r: 2, c: 2, v: 5 },
    { r: 2, c: 3, v: 6 }
  ))
})

test('object -> array', t => {
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
  t.deepEqual(cells, new AddressableCells(    
    { r: 1, c: 1, rs: 2, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 1, c: 4, rs: 2, v: 6 },
    { r: 2, c: 2, v: 4 },
    { r: 2, c: 3, v: 5 }
  ))
})

test('object -> array(scalar)', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: [2, 3, 4], c: 5 }

  const cells = generateCells(data, props)
  t.deepEqual(cells, new AddressableCells( 
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: [2, 3, 4] },
    { r: 1, c: 3, v: 5 }
  ))
})

test('more(object -> array)', t => {
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

  const cells = generateCells(data, props)
  t.deepEqual(cells, new AddressableCells(    
    { r: 1, c: 1, rs: 2, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 },
    { r: 1, c: 4, rs: 2, v: 6 },
    { r: 2, c: 2, v: 4 },
    { r: 2, c: 3, v: 5 },
    { r: 3, c: 1, rs: 2, v: 11 },
    { r: 3, c: 2, v: 12 },
    { r: 3, c: 3, v: 13 },
    { r: 3, c: 4, rs: 2, v: 16 },
    { r: 4, c: 2, v: 14 },
    { r: 4, c: 3, v: 15 }
  ))
})

test('object -> array,array', t => {
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
  t.deepEqual(cells, new AddressableCells(    
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
    { r: 3, c: 2, cs: 2 },
    { r: 3, c: 4, v: 12 },
    { r: 3, c: 5, v: 13 },
    { r: 3, c: 6, v: 14 }
  ))
})

test('object with two levels object array', t => {
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
  t.deepEqual(cells, new AddressableCells(    
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

test('allocation algorithm', t => {
  const props = [
    { 
      key: 'a', 
      props: [ 'a1', 'a2' ]
    }, 
    { 
      key: 'b',
      props: [ 'b1', 'b2' ]
    }
  ]
  const data = {
    a: [
      { a1: 1, a2: 2 },
      { a1: 3, a2: 4 }
    ],
    b: [
      { b1: 5, b2: 6 },
      { b1: 7, b2: 8 },
      { b1: 9, b2: 10 },
      { b1: 11, b2: 12 },
      { b1: 13, b2: 14 }
    ]
  }

  const cells = generateCells(data, props)
  t.deepEqual(cells, new AddressableCells(    
    { r: 1, c: 1, rs: 2, v: 1 },
    { r: 1, c: 2, rs: 2, v: 2 },
    { r: 3, c: 1, rs: 2, v: 3 },
    { r: 3, c: 2, rs: 2, v: 4 },
    { r: 5, c: 1, cs: 2 },
    { r: 1, c: 3, v: 5 },
    { r: 1, c: 4, v: 6 },
    { r: 2, c: 3, v: 7 },
    { r: 2, c: 4, v: 8 },
    { r: 3, c: 3, v: 9 },
    { r: 3, c: 4, v: 10 },
    { r: 4, c: 3, v: 11 },
    { r: 4, c: 4, v: 12 },
    { r: 5, c: 3, v: 13 },
    { r: 5, c: 4, v: 14 }
  ))
})

test('allocation algorithm: heterogeneous', t => {
  const props = [
    { 
      key: 'a', 
      props: [ 'a1', 'a2' ]
    }, 
    { 
      key: 'b'
    }
  ]
  const data = [
    {
      a: [
        { a1: 1, a2: 2 },
        { a1: 3, a2: 4 }
      ],
      b: 5
    },
    {
      a: [
        { a1: 6, a2: 7 },
        { a1: 8, a2: 9 },
        { a1: 10, a2: 11 }
      ],
      b: 12
    }
  ]

  const cells = generateCells(data, props)
  t.deepEqual(cells, new AddressableCells(    
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 2, c: 1, v: 3 },
    { r: 2, c: 2, v: 4 },
    { r: 1, c: 3, rs: 2, v: 5 },
    { r: 3, c: 1, v: 6 },
    { r: 3, c: 2, v: 7 },
    { r: 4, c: 1, v: 8 },
    { r: 4, c: 2, v: 9 },
    { r: 5, c: 1, v: 10 },
    { r: 5, c: 2, v: 11 },
    { r: 3, c: 3, rs: 3, v: 12 }
  ))
})

test('specify row from', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const cells = generateCells(data, props, 2)
  t.deepEqual(cells, new AddressableCells( 
    { r: 2, c: 1, v: 1 },
    { r: 2, c: 2, v: 2 },
    { r: 2, c: 3, v: 3 }
  ))
})
