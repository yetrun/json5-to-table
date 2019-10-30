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

module.exports = {
  Table,
  Row,
  Data 
}
