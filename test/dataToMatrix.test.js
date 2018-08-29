const test = require('ava')
const dataToMatrix = require('../src/dataToMatrix')
const Matrix = require('../src/Matrix')
const { meta, data } = require('./fixtures')

test('convert simple json', t => {
  const matrix = dataToMatrix(meta.simple, data.simple[0])
  t.deepEqual(matrix, new Matrix([
    [ 
      { data: 1, rowSpan: 1, colSpan: 1 },
      { data: 2, rowSpan: 1, colSpan: 1 },
    ]
  ]))
})

test('convert nested json', t => {
  const matrix = dataToMatrix(meta.nested, data.nested[0])
  t.deepEqual(matrix, new Matrix([
    [ 
      { data: 1, rowSpan: 1, colSpan: 1 },
      { data: 2, rowSpan: 1, colSpan: 1 },
      { data: 3, rowSpan: 1, colSpan: 1 }
    ]
  ]))
})
