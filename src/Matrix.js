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

  forEachRow (callback) {
    for (let rowIndex = 1; rowIndex <= this.rowCount; rowIndex++) {
      callback(new Row(this.vector, this._calcIndex(rowIndex, 1) + 1, this.colCount))
    }
  }

  _calcIndex (rowIndex, colIndex) {
    return rowIndex * this.colCount - (this.colCount - colIndex) - 1
  }
}

class Row {
  constructor (vector, from, length) {
    this.vector = vector
    this.from = from
    this.length = length
  }

  forEach (callback) {
    for (let i = this.from; i < this.from + this.length; i++) {
      callback(this.vector[i - 1])
    }
  }
}

module.exports = Matrix
