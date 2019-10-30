const { Table, Row, Cell } = require('./table_classes')

function generateRow (data, props) {
  const row = []
  for (const prop of props) {
    const dataOfProp = data[prop.key]
    if (prop.props) {
      row.push(generateTable(dataOfProp, prop.props))
    } else {
      row.push(new Cell(dataOfProp))
    }
  }
  return new Row(...row)
}

function generateTable (data, props) {
  if (!Array.isArray(data)) {
    data = [data]
  }

  return new Table(
    ...data.map(obj => generateRow(obj, props))
  )
  // TODO: print table
  return table
}

module.exports = generateTable
