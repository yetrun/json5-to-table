const test = require('ava')
const Matrix = require('../lib/matrix')

test('case one', t => {
  const matrix = new Matrix(4, 1)

  matrix.setVal(0, 0, 1)
  matrix.setVal(2, 0, 2)

  t.deepEqual(matrix.toArray(), [
    [1],
    [ undefined ],
    [2],
    [ undefined ]
  ])
})

test('case two', t => {
  const matrix = new Matrix(2, 1)
  const subMatrix = matrix.subview(1, 0)

  t.is(subMatrix.rows, 1)
})
