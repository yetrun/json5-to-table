// 将数据转化为 **Table 对象**

const { Table, Row, Data } = require('./table_defs')
const { isString } = require('./types')

// TODO: 考虑用对象封装
function key (prop) {
  if (isString(prop)) {
    return prop
  }
  return prop.key
}

function generateRow (data, props) {
  const row = []
  for (const prop of props) {
    const dataOfProp = data[key(prop)]
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
