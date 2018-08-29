const test = require('ava')
const dataToMatrix = require('../src/dataToMatrix')
const Matrix = require('../src/Matrix')

test('convert simple json', t => {
  const meta = {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B'
      }
    }
  }
  const data = {
    a: 1,
    b: 2
  }
  const matrix = dataToMatrix(meta, data)
  t.deepEqual(matrix, new Matrix([
    [ 
      { data: 1, rowSpan: 1, colSpan: 1 },
      { data: 2, rowSpan: 1, colSpan: 1 },
    ]
  ]))
})

test('convert nested json', t => {
  const meta = {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B',
        meta: {
          order: ['c', 'd'],
          mapping: {
            c: {
              title: 'C'
            },
            d: {
              title: 'D'
            }
          }
        }
      }
    }
  }
  const data = {
    a: 1,
    b: {
      c: 2,
      d: 3
    }
  }
  const matrix = dataToMatrix(meta, data)
  t.deepEqual(matrix, new Matrix([
    [ 
      { data: 1, rowSpan: 1, colSpan: 1 },
      { data: 2, rowSpan: 1, colSpan: 1 },
      { data: 3, rowSpan: 1, colSpan: 1 }
    ]
  ]))
})
