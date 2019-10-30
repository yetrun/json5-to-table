const { Table, Row, Data } = require('./table_defs')

function generateRow (data, props) {
  const row = []
  for (const prop of props) {
    const dataOfProp = data[prop.key]
    if (prop.props) {
      row.push(generateTable(dataOfProp, prop.props))
    } else {
      row.push(new Data(dataOfProp))
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
  return table
}

module.exports = generateTable
