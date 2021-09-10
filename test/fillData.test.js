const test = require('ava')
const fillData = require('../lib/fillData')
const Matrix = require('../lib/matrix')

test('fill null', t => {
  const schema = { path: 'a' }
  const data = null
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: undefined, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill primitive value', t => {
  const schema = { path: 'a' }
  const data = 1
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: undefined, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill empty object', t => {
  const schema = { path: 'a' }
  const data = {}
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: undefined, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill missing property', t => {
  const schema = { path: 'a' }
  const data = { b: 1 } 
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: undefined, rowSpan: 1, colSpan: 1 } ]
  ])
})

// path 是空白字符串
test('fill full value', t => {
  const schema = { path: '' }
  const data = 1
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('cell value can be array', t => {
  const schema = { path: '' }
  const data = [1, 2, 3] 
  const matrix = new Matrix(3, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ],
    [ { val: 2, rowSpan: 1, colSpan: 1 } ],
    [ { val: 3, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill simple object', t => {
  const schema = { path: 'a' }
  const data = { a: 1 }
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('extra property is irrelevant', t => {
  const schema = { path: 'a' }
  const data = { a: 1, b: 2 }
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill using multiple keys path', t => {
  const schema = { path: 'a.b' }
  const data = { a: { b: 1 }}
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill into crossing rows', t => {
  const schema = { path: 'a' }
  const data = { a: 1, b: 2 }
  const matrix = new Matrix(2, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 } ],
    [ undefined ]
  ])
})

test('fill object array', t => {
  const schema = { path: 'a' }
  const data = [{ a: 1 }, { a: 2 }]
  const matrix = new Matrix(2, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ],
    [ { val: 2, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill object array into more rows', t => {
  const schema = { path: 'a' }
  const data = [{ a: 1 }, { a: 2 }]
  const matrix = new Matrix(4, 1)

  fillData(data, schema, matrix)

  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 } ],
    [ undefined ],
    [ { val: 2, rowSpan: 2, colSpan: 1 } ],
    [ undefined ]
  ])
})

// 测试无法整除的情形
test('fill simple object array into more rows, which is not divisible', t => {
  const schema = { path: 'a' }
  const data = [{ a: 1, b: 0 }, { a: 2, b: 0 }]
  const matrix = new Matrix(5, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 } ],
    [ undefined ],
    [ { val: 2, rowSpan: 2, colSpan: 1 } ],
    [ undefined ],
    [ { val: undefined, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill nested properties', t => {
  const schema = { path: 'a', props: [
    { path: 'b' }, { path: 'c' }
  ] }
  const data = { a: { b: 1, c: 2 } }
  const matrix = new Matrix(1, 2)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 },
      { val: 2, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill array with nested properties', t => {
  const schema = { path: 'a', props: [
    { path: 'b' }, { path: 'c' }
  ] }
  const data = [{ a: { b: 1, c: 2 } }, { a: { b: 3, c: 4 }}]
  const matrix = new Matrix(4, 2)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 }, { val: 2, rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ],
    [ { val: 3, rowSpan: 2, colSpan: 1 }, { val: 4, rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ]
  ])
})

test('fill array with nested properties into more rows, which is not divisible', t => {
  const schema = { path: 'a', props: [
    { path: 'b' }, { path: 'c' }
  ] }
  const data = [{ a: { b: 1, c: 2 } }, { a: { b: 3, c: 4 }}]
  const matrix = new Matrix(5, 2)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 }, { val: 2, rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ],
    [ { val: 3, rowSpan: 2, colSpan: 1 }, { val: 4, rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ],
    [ { val: undefined, rowSpan: 1, colSpan: 2 }, undefined ]
  ])
})

test('fill when schema is array', t => {
  const schema = [
    { path: 'a' }, 
    { path: 'b' }
  ]
  const data = { a: 1, b: 2 }
  const matrix = new Matrix(1, 2)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 }, 
      { val: 2, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill when schema is array and the first data property is array', t => {
  const schema = [
    { path: 'a', props: [
      { path: 'a1' },
      { path: 'a2' }
    ] }, 
    { path: 'b' }
  ]
  const data = { a: [
    { a1: 1, a2: 2 },
    { a1: 3, a2: 4 }
  ], b: 5 }
  const matrix = new Matrix(2, 3)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 }, 
      { val: 2, rowSpan: 1, colSpan: 1 },
      { val: 5, rowSpan: 2, colSpan: 1 },
    ],
    [ { val: 3, rowSpan: 1, colSpan: 1 }, 
      { val: 4, rowSpan: 1, colSpan: 1 },
      undefined
    ]
  ])
})

test('fill when schema is array and the first schema item occupy multiple colomns', t => {
  const schema = [
    { path: 'a', props: [ 
      { path: 'b' }, { path: 'c' } 
    ] }, 
    { path: 'd' }
  ]
  const data = { a: { b: 1, c: 2 }, d: 3 }
  const matrix = new Matrix(1, 3)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 }, 
      { val: 2, rowSpan: 1, colSpan: 1 },
      { val: 3, rowSpan: 1, colSpan: 1 } ]
  ])
})

// 空白数组
test('fill empty array', t => {
  const schema = { path: 'a' }
  const data = []
  const matrix = new Matrix(1, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: undefined, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill empty array into multiple rows', t => {
  const schema = { path: 'a' }
  const data = []
  const matrix = new Matrix(2, 1)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: undefined, rowSpan: 2, colSpan: 1 } ],
    [ undefined ]
  ])
})

test('fill empty array with multiple schemas', t => {
  const schema = [ 
    { path: 'a' },
    { path: 'b' }
  ]
  const data = []
  const matrix = new Matrix(2, 2)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: undefined, rowSpan: 2, colSpan: 1 },
      { val: undefined, rowSpan: 2, colSpan: 1 },
    ],
    [ undefined,
      undefined
    ]
  ])
})

test('one property is an empty array', t => {
  const schema = [ 
    { path: 'a' },
    { path: 'b', props: [
      { path: 'b1' },
      { path: 'b2' }
    ] },
    { path: 'c', props: [
      { path: 'c1' },
      { path: 'c2' }
    ]}
  ]
  const data = [
    {
      a: 1,
      b: [],
      c: [
        { c1: 2, c2: 3 },
        { c1: 4, c2: 5 }
      ]
    }
  ]
  const matrix = new Matrix(2, 5)

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 },
      { val: undefined, rowSpan: 2, colSpan: 1 },
      { val: undefined, rowSpan: 2, colSpan: 1 },
      { val: 2, rowSpan: 1, colSpan: 1 },
      { val: 3, rowSpan: 1, colSpan: 1 }
    ],
    [ undefined,
      undefined,
      undefined,
      { val: 4, rowSpan: 1, colSpan: 1 },
      { val: 5, rowSpan: 1, colSpan: 1 }
    ]
  ])
})

// 每一条数据占据的行数是不同的
test('every data item occupies different rows', t => {
  const matrix = new Matrix(3, 1)
  const data = [
    {
      "items": [
        { "text": "item 1" },
        { "text": "item 2" }
      ]
    },
    {
      "items": [
        { "text": "item 3" }
      ]
    }
  ]
  const schema = [
    { "path": "items", "props": [
      { "path": "text" }
    ] }
  ]

  fillData(data, schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 'item 1', rowSpan: 1, colSpan: 1 } ],
    [ { val: 'item 2', rowSpan: 1, colSpan: 1 } ],
    [ { val: 'item 3', rowSpan: 1, colSpan: 1 } ]
  ])
})
