class Matrix {
  constructor () {
    if (arguments.length === 1) {
      const matrix = arguments[0]
      this.rowCount = matrix.length
      this.colCount = matrix[0].length
      this.vector = [].concat.apply([], matrix)
    } else {
      const [rowCount, colCount] = arguments
      this.rowCount = rowCount
      this.colCount = colCount
      this.vector = new Array(rowCount * colCount)
    }
  }

  set (rowIndex, colIndex, data) {
    const index = this._calcIndex(rowIndex, colIndex)
    this.vector[index] = data
  }

  _calcIndex (rowIndex, colIndex) {
    return rowIndex * this.colCount - (this.colCount - colIndex) - 1
  }
}

module.exports = Matrix
