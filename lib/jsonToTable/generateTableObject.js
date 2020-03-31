// 将数据转化为 **Table 对象**

const { Table, Row, Data } = require('./table_defs')
const { isArray, isObject } = require('../types')

function generateRow (data, props) {
  const row = []
  for (const prop of props) {
    const dataOfProp = data[prop.key]
    if (prop.props) {
      if (isArray(dataOfProp) || isObject(dataOfProp)) {
        row.push(generateTable(dataOfProp, prop.props))
      } else {
        // 这里有一个问题，我如何把一个 null 或者 undefined 映射到这个 row 内
        // 我似乎只能将其转化为空对象，然后再映射
        row.push(generateTable({}, prop.props))
      }
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
