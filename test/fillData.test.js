const test = require('ava')
const fillData = function () {}

// TODO: 是否存在嵌套测试
// 测试空白数据
;[
  { data: null, description: 'null or undefined' },
  { data: 1, description: 'primivate value' },
  { data: {}, description: 'empty object' },
  { array: [], description: 'empty array' },
  { data: { b: 1 }, description: 'missing property' }
].forEach(({ data, description }) => {
  test(`fill ${description}`, t => {
    const schema = { path: 'a' }
    const matrix = new Matrix(1, 1)

    fillData(schema, data, matrix)
    t.deepEquals(matrix.toArray(), [
      [ { val: undefined, rowSpan: 1, colSpan: 1 } ]
    ])
  })
})

test('fill simple object', t => {
  const schema = { path: 'a' }
  const data = { a: 1, b: 2 }
  const matrix = new Matrix(1, 1)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill multiple keys path', t => {
  const schema = { path: 'a.b' }
  const data = { a: { b: 1 }}
  const matrix = new Matrix(1, 1)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill into crossing rows', t => {
  const schema = { path: 'a' }
  const data = { a: 1, b: 2 }
  const matrix = new Matrix(2, 1)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 } ],
    [ undefined ]
  ])
})

test('fill object array', t => {
  const schema = { path: 'a' }
  const data = [{ a: 1, b: 0 }, { a: 2, b: 0 }]
  const matrix = new Matrix(2, 1)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 } ],
    [ { val: 2, rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill object array into crossing rows', t => {
  const schema = { path: 'a' }
  const data = [{ a: 1, b: 0 }, { a: 2, b: 0 }]
  const matrix = new Matrix(4, 1)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 } ],
    [ undefined ],
    [ { val: 2, rowSpan: 2, colSpan: 1 } ]
    [ undefined ]
  ])
})

// 测试无法整除的情形
test('fill object array into odd crossing rows', t => {
  const schema = { path: 'a' }
  const data = [{ a: 1, b: 0 }, { a: 2, b: 0 }]
  const matrix = new Matrix(5, 1)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 } ],
    [ undefined ],
    [ { val: 2, rowSpan: 2, colSpan: 1 } ]
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

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
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

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 }, { val: 2, rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ],
    [ { val: 3, rowSpan: 2, colSpan: 1 }, { val: 4, rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ]
  ])
})

test('fill array with nested properties into odd crossing rows', t => {
  const schema = { path: 'a', props: [
    { path: 'b' }, { path: 'c' }
  ] }
  const data = [{ a: { b: 1, c: 2 } }, { a: { b: 3, c: 4 }}]
  const matrix = new Matrix(4, 2)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 2, colSpan: 1 }, { val: 2, rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ],
    [ { val: 3, rowSpan: 2, colSpan: 1 }, { val: 4, rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ],
    [ { val: undefined, rowSpan: 1, colSpan: 2 }, undefined ]
  ])
})

test('fill with multiple property schemas', t => {
  const schema = [
    { path: 'a', props: [
      { path: 'a1' }, { path: 'a2' }
    ] }, 
    { path: 'b' }
  ]
  const data = { a: { a1: 1, a2: 2 }, b: 3 }
  const matrix = new Matrix(1, 3)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 1, rowSpan: 1, colSpan: 1 }, 
      { val: 2, rowSpan: 1, colSpan: 1 },
      { val: 3, rowSpan: 1, colSpan: 1 } ]
  ])
})
