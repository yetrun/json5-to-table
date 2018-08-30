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

test('convert undefined prop', t => {
  const matrix = dataToMatrix(meta.simple, { b: 1 })
  t.deepEqual(matrix, new Matrix([
    [ 
      { data: undefined, rowSpan: 1, colSpan: 1 },
      { data: 1, rowSpan: 1, colSpan: 1 },
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

test('convert nested object array', t => {
  const matrix = dataToMatrix(meta.nested, data.nestedObjectArray[0])
  t.deepEqual(matrix, new Matrix([
    [ 
      { data: 1, rowSpan: 2, colSpan: 1 },
      { data: 2, rowSpan: 1, colSpan: 1 },
      { data: 3, rowSpan: 1, colSpan: 1 }
    ],
    [ 
      false,
      { data: 4, rowSpan: 1, colSpan: 1 },
      { data: 5, rowSpan: 1, colSpan: 1 }
    ]
  ]))
})
