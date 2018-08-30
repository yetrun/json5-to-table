const Matrix = require('./Matrix')
const countMetaMatrixSize = require('./countMetaMatrixSize')

function metaToMatrix (meta) {
  const [rowSpan, colSpan] = countMetaMatrixSize(meta)
  const matrix = new Matrix(rowSpan, colSpan)
  metaToMatrixHelper(meta, matrix, 1, 1)
  return matrix
}

function metaToMatrixHelper (meta, matrix, rowFrom, colFrom) {
  const originalColFrom = colFrom
  for (const key of meta.order) {
    const props = meta.mapping[key]
    if (props.meta) {
      const colSpan = metaToMatrixHelper (props.meta, matrix, rowFrom + 1, colFrom)
      matrix.set(rowFrom, colFrom, { rowSpan: 1, colSpan: colSpan, title: props.title })
      for (let colIndex = colFrom + 1; colIndex < colFrom + colSpan; colIndex++) {
        matrix.set(rowFrom, colIndex, false)
      }
      colFrom += colSpan
    } else {
      matrix.set(rowFrom, colFrom, 
        { rowSpan: matrix.rowCount - rowFrom + 1, colSpan: 1, title: props.title })
      for (let rowIndex = rowFrom + 1; rowIndex <= matrix.rowCount; rowIndex++) {
        matrix.set(rowIndex, colFrom, false)
      }
      colFrom += 1
    }
  }
  return colFrom - originalColFrom
}

module.exports = metaToMatrix
