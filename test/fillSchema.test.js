const test = require('test')
const fillSchema = function () {}

test('fill simple schema', t => {
  const schema = { title: 'A' }
  const matrix = new Matrix(1, 1)

  fillSchema(schema, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 'A', rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill simple schema into crossing rows', t => {
  const schema = { title: 'A' }
  const matrix = new Matrix(2, 1)

  fillSchema(schema, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 'A', rowSpan: 2, colSpan: 1 } ],
    [ undefined ]
  ])
})

test('fill nested schema', t => {
  const schema = { title: 'A', props: [
    { title: 'B' }, { 'title': 'C' }
  ] }
  const matrix = new Matrix(1, 2)

  fillSchema(schema, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 'A', rowSpan: 1, colSpan: 2 },
      undefined ],
    [ { val: 'B', rowSpan: 1, colSpan: 1 },
      { val: 'C', rowSpan: 1, colSpan: 1 } ],
  ])
})

test('fill nested schema into odd crossing rows', t => {
  const schema = { title: 'A', props: [
    { title: 'B' }, { 'title': 'C' }
  ] }
  const matrix = new Matrix(5, 2)

  fillSchema(schema, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 'A', rowSpan: 3, colSpan: 2 },
      undefined ],
    [ undefined, undefined ],
    [ undefined, undefined ],
    [ { val: 'B', rowSpan: 2, colSpan: 1 },
      { val: 'C', rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ]
  ])
})

test('fill multiple property schemas', t => {
  const schema = [
    { title: 'A', props: [
      { title: 'C' }, { title: 'D' }
    ] }, 
    { title: 'B' }
  ]
  const matrix = new Matrix(1, 3)

  fillData(schema, data, matrix)
  t.deepEquals(matrix.toArray(), [
    [ { val: 'A', rowSpan: 1, colSpan: 2 }, 
      undefined,
      { val: 'B', rowSpan: 2, colSpan: 1 } ],
    [ { val: 'C', rowSpan: 1, colSpan: 1 }, 
      { val: 'D', rowSpan: 1, colSpan: 1 },
      undefined ]
  ])
})
