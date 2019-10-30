class Table {
  constructor (...rows) {
    // rows must be of Row instance
    this._rows = rows
  }
}

class Row {
  constructor (...columns) {
    this._cells = columns
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
