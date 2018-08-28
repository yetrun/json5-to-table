const test = require('ava')
const metaToMatrix = require('../src/metaToMatrix')
const Matrix = require('../src/Matrix')

test('simple meta to matrix', t => {
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
  const matrix = metaToMatrix(meta)
  t.deepEqual(matrix, new Matrix([
    [
      { title: 'A', rowSpan: 1, colSpan: 1 },
      { title: 'B', rowSpan: 1, colSpan: 1 }
    ]
  ]))
})

test('nested meta to matrix', t => {
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
  const matrix = metaToMatrix(meta)
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
