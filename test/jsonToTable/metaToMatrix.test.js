const test = require('ava')
const metaToMatrix = require('../../src/jsonToTable/metaToMatrix')
const Matrix = require('../../src/Matrix')
const { meta } = require('./fixtures')

test('simple meta to matrix', t => {
  const matrix = metaToMatrix(meta.simple)
  t.deepEqual(matrix, new Matrix([
    [
      { title: 'A', rowSpan: 1, colSpan: 1 },
      { title: 'B', rowSpan: 1, colSpan: 1 }
    ]
  ]))
})

test('nested meta to matrix', t => {
  const matrix = metaToMatrix(meta.nested)
  t.deepEqual(matrix, new Matrix([
    [
      { title: 'A', rowSpan: 2, colSpan: 1 },
      { title: 'B', rowSpan: 1, colSpan: 2 },
      false
    ],
    [
      false,
      { title: 'C', rowSpan: 1, colSpan: 1 },
      { title: 'D', rowSpan: 1, colSpan: 1 },
    ]
  ]))
})
