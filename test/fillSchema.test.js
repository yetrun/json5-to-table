const test = require('ava')
const fillSchema = require('../lib/fillSchema')
const Matrix = require('../lib/matrix')

test('fill simple schema', t => {
  const schema = { title: 'A' }
  const matrix = new Matrix(1, 1)

  fillSchema(schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 'A', rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill simple schema into crossing rows', t => {
  const schema = { title: 'A' }
  const matrix = new Matrix(2, 1)

  fillSchema(schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 'A', rowSpan: 2, colSpan: 1 } ],
    [ undefined ]
  ])
})

test('fill nested properties', t => {
  const schema = { title: 'A', props: [
    { title: 'B' }, { 'title': 'C' }
  ] }
  const matrix = new Matrix(2, 2)

  fillSchema(schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 'A', rowSpan: 1, colSpan: 2 },
      undefined ],
    [ { val: 'B', rowSpan: 1, colSpan: 1 },
      { val: 'C', rowSpan: 1, colSpan: 1 } ],
  ])
})

test('fill nested schema while rows is not divisible', t => {
  const schema = { title: 'A', props: [
    { title: 'B' }, { 'title': 'C' }
  ] }
  const matrix = new Matrix(5, 2)

  fillSchema(schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 'A', rowSpan: 3, colSpan: 2 },
      undefined ],
    [ undefined, undefined ],
    [ undefined, undefined ],
    [ { val: 'B', rowSpan: 2, colSpan: 1 },
      { val: 'C', rowSpan: 2, colSpan: 1 } ],
    [ undefined, undefined ]
  ])
})

test('fill nested schema while inner props are not equal depths', t => {
  const schema = { title: 'A', props: [
    { title: 'B' }, 
    { 'title': 'C', props: [
      { title: 'D' }, { title: 'E' }
    ] }
  ] }
  const matrix = new Matrix(5, 3)

  fillSchema(schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 'A', rowSpan: 2, colSpan: 3 },
      undefined,
      undefined ],
    [ undefined, undefined, undefined ],
    [ { val: 'B', rowSpan: 3, colSpan: 1 },
      { val: 'C', rowSpan: 2, colSpan: 2 },
      undefined ],
    [ undefined, undefined, undefined ],
    [ undefined,
      { val: 'D', rowSpan: 1, colSpan: 1 },
      { val: 'E', rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill simple schemas while schema is array', t => {
  const schema = [
    { title: 'A' }, 
    { title: 'B' }
  ]
  const matrix = new Matrix(1, 2)

  fillSchema(schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 'A', rowSpan: 1, colSpan: 1 }, 
      { val: 'B', rowSpan: 1, colSpan: 1 } ]
  ])
})

test('fill nested schemas while schema is array', t => {
  const schema = [
    { title: 'A', props: [
      { title: 'C' }, { title: 'D' }
    ] }, 
    { title: 'B' }
  ]
  const matrix = new Matrix(2, 3)

  fillSchema(schema, matrix)
  t.deepEqual(matrix.toArray(), [
    [ { val: 'A', rowSpan: 1, colSpan: 2 }, 
      undefined,
      { val: 'B', rowSpan: 2, colSpan: 1 } ],
    [ { val: 'C', rowSpan: 1, colSpan: 1 }, 
      { val: 'D', rowSpan: 1, colSpan: 1 },
      undefined ]
  ])
})
