const Matrix = require('./Matrix')

function dataToMatrix (meta, data) {
  const array = []
  dataToMatrixHelper(meta, data, array, 0)
  return new Matrix([array])
}

function dataToMatrixHelper (meta, data, array) {
  for (const key of meta.order) {
    const props = meta.mapping[key]
    if (props.meta) {
      dataToMatrixHelper(props.meta, data[key], array)
    } else {
      array.push({ data: data[key], rowSpan: 1, colSpan: 1 })
    }
  }
}

module.exports = dataToMatrix
