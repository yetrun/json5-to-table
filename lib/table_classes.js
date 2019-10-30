class Table {
  constructor (...rows) {
    // rows must be of Row instance
    this._rows = rows
  }
}

class Row {
  constructor (...columns) {
    this._cols = columns
  }
}

class Cell {
  constructor (value) {
    this._val = value
  }
}

module.exports = {
  Table,
  Row,
  Cell 
}
