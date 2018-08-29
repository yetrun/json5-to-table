const Matrix = require('./Matrix')

function dataToMatrix (meta, data) {
  const array = []
  for (const key of meta.order) {
    array.push({ data: data[key], rowSpan: 1, colSpan: 1 })
  }
  return new Matrix([array])
}

module.exports = dataToMatrix
