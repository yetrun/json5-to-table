const generateHeadCells = require('./generateHeadCells')
const generateBodyCells = require('./generateBodyCells')

function calcNextRow (cells) {
  const lastCell = cells._cells[cells._cells.length - 1]
  return lastCell.r + lastCell.rs
}

class Context {
  constructor () {
    this._currentRow = 1
  }

  parseProps (props) {
    const cells = generateHeadCells(props, this._currentRow)
    this._currentRow = calcNextRow(cells)
    return cells
  }

  parseNextData (data, props) {
    const cells = generateBodyCells(data, props, this._currentRow)
    this._currentRow = calcNextRow(cells)
    return cells
  }
}

module.exports = Context
