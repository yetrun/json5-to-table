// 生成层叠结构的表格

const retrieveProperty = require('../helpers/retrieveProperty')

class TableElement {}

class Table extends TableElement {
  constructor (rows) {
    super()

    this.rows = rows.map(row => {
      return row instanceof TableElement ? row : new Row(row)
    })
    this.size = [
      this.rows.reduce((rowOccupy, row) => rowOccupy + row.size[0], 0),
      this.rows[0].size[1]
    ]
  }
}

class Row extends TableElement {
  constructor (cells) {
    super()

    this.cells = cells.map(cell => {
      return cell instanceof TableElement ? cell : new Cell(cell)
    })
    this.size = [
      Math.max(...this.cells.map(cell => cell.size[0])),
      this.cells.reduce((colOccupy, cell) => colOccupy + cell.size[1], 0)
    ]
  }
}

class Cell extends TableElement {
  constructor ({ val }) {
    super()

    this.val = val
    this.size = [1, 1]
  }
}

function generateTable (data, schema) {
  if (Array.isArray(data) && data.length > 0) {
    return new Table(data.map(dataItem => generateTable(dataItem, schema)))
  }

  if (Array.isArray(schema)) {
    return new Row(schema.map(schemaItem => generateTable(data, schemaItem)))
  }
  
  const value = retrieveProperty(data, schema.path)
  if (schema.props) {
    return generateTable(value, schema.props)
  }

  return new Cell({ val: value })
}

module.exports = {
  Table, Row, Cell,
  generateTable
}
