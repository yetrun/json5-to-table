const Matrix = require('./Matrix')

function metaToMatrix (meta) {
  const [rowSpan, colSpan] = countMatrixSize(meta)
  const matrix = new Matrix(rowSpan, colSpan)
  metaToMatrixHelper(meta, matrix, 1, 1)
  return matrix
}

function countMatrixSize (meta) {
  let rowSpan = 0
  let colSpan = 0
  for (const key of meta.order) {
    const props = meta.mapping[key]
    let keyRowSpan = 1
    let keyColSpan = 1
    if (props.meta) {
      const [_rowSpan, _colSpan] = countMatrixSize(props.meta)
      keyRowSpan = 1 + _rowSpan
      keyColSpan = _colSpan
    }
    rowSpan = Math.max(rowSpan, keyRowSpan)
    colSpan += keyColSpan
  }
  return [rowSpan, colSpan]
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
