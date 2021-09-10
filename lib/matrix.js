const difference = require('lodash/difference')
const isFunction = require('lodash/isFunction')

class Matrix {
  constructor (rows = 0, cols = 0) {
    this._rows = rows
    this._cols = cols
    this._array = new Array(rows * cols)
  }

  get rows () {
    return this._rows
  }

  get cols () {
    return this._cols
  }

  getVal (rowIndex, colIndex) {
    return this._array[this._arrayIndex(rowIndex, colIndex)]
  }

  setVal (rowIndex, colIndex, value) {
    this._array[this._arrayIndex(rowIndex, colIndex)] = value
  }

  _arrayIndex (rowIndex, colIndex) {
    if (rowIndex >= this.rows || colIndex >= this.cols) {
      throw new Matrix.IndexOutOfBounds(rowIndex, colIndex)
    }

    return rowIndex * this.cols + colIndex
  }

  // 迭代
  forEach (fn) {
    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      for (let colIndex = 0; colIndex < this.cols; colIndex++) {
        const value = this.getVal(rowIndex, colIndex)
        fn(value, rowIndex, colIndex)
      }
    }
  }

  // 映射一个新的矩阵
  map (fn) {
    const array = []

    this.forEach((value, rowIndex, colIndex) => {
      const mappedValue = fn(value, rowIndex, colIndex)
      array.push(mappedValue)
    })

    const matrix = new Matrix(this.rows, this.cols)
    matrix._array = array
    return matrix
  }

  subview (rowStart = 0, colStart = 0, rowSpan, colSpan) {
    if (rowSpan === undefined || rowSpan === null || rowSpan >= this.rows) {
      rowSpan = this.rows - rowStart
    }
    if (colSpan === undefined || colSpan === null || colSpan >= this.cols) {
      colSpan = this.cols - colStart
    }

    return new MatrixView(this, [rowStart, colStart, rowSpan, colSpan])
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
}

class MatrixView {
  constructor (parentMatrix, [rowStart, colStart, rowSpan, colSpan]) {
    this._parentMatrix = parentMatrix

    this._rowStart = rowStart
    this._colStart = colStart
    this._rowSpan = rowSpan
    this._colSpan = colSpan
  }

  get rows () {
    return this._rowSpan
  }

  get cols () {
    return this._colSpan
  }

  getVal (rowIndex, colIndex) {
    const [rowIndexInParent, colIndexInParent] = this._calcIndexInParent(rowIndex, colIndex)
    return this._parentMatrix.getVal(rowIndexInParent, colIndexInParent)
  }

  setVal (rowIndex, colIndex, value) {
    const [rowIndexInParent, colIndexInParent] = this._calcIndexInParent(rowIndex, colIndex)
    return this._parentMatrix.setVal(rowIndexInParent, colIndexInParent, value)
  }

  _calcIndexInParent (rowIndex, colIndex) {
    if (rowIndex >= this.rows || colIndex >= this.cols) {
      throw new Matrix.IndexOutOfBounds(rowIndex, colIndex)
    }

    return [this._rowStart + rowIndex, this._colStart + colIndex]
  }

  subview (rowStart = 0, colStart = 0, rowSpan, colSpan) {
    if (rowSpan === undefined || rowSpan === null || rowSpan >= this.rows) {
      rowSpan = this.rows - rowStart
    }
    if (colSpan === undefined || colSpan === null || colSpan >= this.cols) {
      colSpan = this.cols - colStart
    }

    rowStart += this._rowStart
    colStart += this._colStart
    return new MatrixView(this._parentMatrix, [rowStart, colStart, rowSpan, colSpan])
  }
}

// 将 Matrix 的方法复制到 MatrixView 的原型链中
const matrixMethods = Object.getOwnPropertyNames(Matrix.prototype)
const matrixViewMethods = Object.getOwnPropertyNames(MatrixView.prototype)
const missingMethods = difference(matrixMethods, matrixViewMethods).filter(methodName => !methodName.startsWith('_'))
missingMethods.forEach(methodName => {
  const methodDescriptor = Object.getOwnPropertyDescriptor(Matrix.prototype, methodName)

  if ('get' in methodDescriptor || 'set' in methodDescriptor) {
    throw new Error(`未在 MatrixView 中覆盖所有的 getter 和 setter：${methodName}`)
  }

  if (!('value' in methodDescriptor) || !(isFunction(methodDescriptor.value))) {
    throw new Error(`Matrix 中的属性 ${methodName} 不是一个函数`)
  }

  MatrixView.prototype[methodName] = function(...params) {
    return this._parentMatrix[methodName](...params)
  }
})

Matrix.IndexOutOfBounds = class extends Error {
  constructor (rowIndex, colIndex) {
    super(`矩阵访问越界：[${rowIndex}, ${colIndex}]`)
  }
}

module.exports = Matrix
