const _ = require('lodash')

class Matrix {
  constructor (rows = 0, cols = 0) {
    // 以下是矩阵的原始属性
    this._rows = rows
    this._cols = cols
    this._array = new Array(rows * cols)

    // 以下是有关视图的属性
    this._rowStart = 0
    this._colStart = 0
    this._rowSpan = rows
    this._colSpan = cols
  }

  get rows () {
    return this._rowSpan
  }

  get cols () {
    return this._colSpan
  }

  getVal (rowIndex, colIndex) {
    return this._array[this._arrayIndex(rowIndex, colIndex)]
  }

  setVal (rowIndex, colIndex, value) {
    this._array[this._arrayIndex(rowIndex, colIndex)] = value
  }

  subview (rowStart = 0, colStart = 0, rowSpan, colSpan) {
    if (_.isNil(rowSpan) || rowSpan >= this._rowSpan) {
      rowSpan = this._rowSpan
    }
    if (_.isNil(colSpan) || colSpan >= this._colSpan) {
      colSpan = this._colSpan
    }

    const matrix = new Matrix()

    matrix._rows = this._rows
    matrix._cols = this._cols
    matrix._array = this._array

    matrix._rowStart = this._rowStart + rowStart
    matrix._colStart = this._colStart + colStart
    matrix._rowSpan = rowSpan
    matrix._colSpan = colSpan

    return matrix
  }

  toArray () {
    const array = []

    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      const rows = []

      for (let colIndex = 0; colIndex < this.cols; colIndex++) {
        rows.push(this.getVal(rowIndex, colIndex))
      }

      array.push(rows)
    }

    return array
  }

  _arrayIndex (rowIndex, colIndex) {
    if (rowIndex >= this._rowSpan || colIndex >= this._colSpan) {
      throw new Matrix.IndexOutOfBounds(rowIndex, colIndex)
    }

    const fullRowIndex = this._rowStart + rowIndex
    const fullColIndex = this._colStart + colIndex

    return fullRowIndex * this._cols + fullColIndex
  }
}

Matrix.IndexOutOfBounds = class extends Error {
  constructor (rowIndex, colIndex) {
    super(`矩阵访问越界：[${rowIndex}, ${colIndex}]`)
  }
}

module.exports = Matrix
