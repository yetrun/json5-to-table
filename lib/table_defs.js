class Table {
  constructor (...rows) {
    this._rows = rows.map(row => {
      if (row instanceof Row) {
        return row
      } else if (Array.isArray(row)) {
        return new Row(...row)
      } else {
        throw new Error('无法识别的 row 类型')
      }
    })
  }
}

class Row {
  constructor (...columns) {
    this._cells = columns.map(cell => {
      if (cell instanceof Data || cell instanceof Table) {
        return cell
      } else if (Array.isArray(cell)) {
        return new Table(...cell)
      } else {
        return new Data(cell)
      }
    })
  }
}

class Data {
  constructor (value) {
    this._val = value
  }
}

class AddressableCell {
  constructor (opts) {
    this.r = opts.r
    this.c = opts.c
    this.rs = opts.rs || 1
    this.cs = opts.cs || 1
    this.v = opts.v
  }
}

function AddressableCells(...cells) {
  return cells.map(
    cell => cell instanceof AddressableCell ? cell : new AddressableCell(cell)
 )
}

module.exports = {
  Table,
  Row,
  Data,
  AddressableCell,
  AddressableCells
}
