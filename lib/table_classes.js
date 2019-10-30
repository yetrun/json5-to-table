class Table {
  constructor (...rows) {
    // rows must be of Row instance
    this._rows = rows
  }
}

class Row {
  constructor (...columns) {
    this._cols = columns.map(column => 
      column instanceof Cell ? column : new Cell(column)
    )
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
