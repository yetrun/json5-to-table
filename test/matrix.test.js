const test = require('ava')
const Matrix = require('../lib/Matrix')

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
