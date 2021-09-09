const fillSchemaSize = require('./helpers/fillSchemaSize')
const calcDataSize = require('./helpers/calcDataSize')
const retrieveProperty = require('./helpers/retrieveProperty')
const zip = require('lodash.zip')

// 占满行，动态占据列
function fillData (data, schema, matrix) {
  if (!('size' in schema)) {
    schema = fillSchemaSize(schema)
  }

  if (Array.isArray(data)) {
    // 计算所有元素占据的行数
    let rowOccupies = data.map(dataItem => calcDataSize(dataItem, schema)[0])
    const totalRowOccupy = rowOccupies.reduce((total, i) => total + i, 0)
    const factor = Math.floor(matrix.rows / totalRowOccupy)
    rowOccupies = rowOccupies.map(rowOccupy => rowOccupy * factor)

    let rowStart = 0
    const arrayOfOccupyCols = []
    for (const [dataItem, rowOccupy] of zip(data, rowOccupies)) {
      const occupyCols = fillData(dataItem, schema, matrix.subview(rowStart, 0, rowOccupy, matrix.cols))
      arrayOfOccupyCols.push(occupyCols)
      rowStart += rowOccupy
    }

    if (Math.max(...arrayOfOccupyCols) > schema.size[1]) {
      throw new Error('遇到断言错误：数组中填充时用到的空间不与 schema 定义的空间一致')
    }

    // 余下不能被整除的部分合并为单个单元格
    if (rowStart < matrix.rows) {
      matrix.setVal(rowStart, 0, { val: undefined, rowSpan: matrix.rows - rowStart, colSpan: schema.size[1] })
    }

    return schema.size[1]
  }

  if (Array.isArray(schema)) {
    let colStart = 0

    for (const schemaItem of schema) {
      const occupyCols = fillData(data, schemaItem, matrix.subview(0, colStart))
      colStart += occupyCols
    }

    return colStart
  }

  const propValue = retrieveProperty(data, schema.path)

  // dataObject 是一个对象，schemaObject 是一个对象
  if (schema.props) {
    return fillData(propValue, schema.props, matrix)
  }

  matrix.setVal(0, 0, { val: propValue, rowSpan: matrix.rows, colSpan: 1 })
  return 1
}

module.exports = fillData
