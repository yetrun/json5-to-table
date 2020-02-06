const Ajv = require('ajv')
const schema = require('./schema')
const normalizeProps = require('./normalizeProps')
const generateProps = require('./generateProps')
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

  initProps (props) {
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    const valid = validate(props)
    if (!valid) {
      throw validate.errors
    }
    this._props = normalizeProps(props)
  }

  initPropsFromData (array) {
    this._props = normalizeProps(generateProps(array.slice(0, 10)))
  }

  generateHeadCells () {
    const cells = generateHeadCells(this._props, this._currentRow)
    this._currentRow = calcNextRow(cells)
    return cells
  }

  generateDataCells (data) {
    const cells = generateBodyCells(data, this._props, this._currentRow)
    this._currentRow = calcNextRow(cells)
    return cells
  }
}

module.exports = Context
