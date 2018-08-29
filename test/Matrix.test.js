const test = require('ava')
const Matrix = require('../src/Matrix')

test('set value', t => {
  const matrix = new Matrix(3, 2)
  matrix.set(1, 1, 1)
  matrix.set(1, 2, 2)
  matrix.set(2, 1, 3)
  matrix.set(2, 2, 4)
  matrix.set(3, 1, 5)
  matrix.set(3, 2, 6)
  t.deepEqual(matrix.vector, [1, 2, 3, 4, 5, 6])
})

test('for each row', t => {
  const matrix = new Matrix([
    [1, 2], [3, 4], [5, 6]
  ])
  const arrays = []
  matrix.forEachRow(row => {
    arrays.push([])
    console.log(arrays)
    row.forEach(item => {
      arrays[arrays.length - 1].push(item)
    })
  })
  t.deepEqual(arrays, [
    [1, 2], [3, 4], [5, 6]
  ])
})
