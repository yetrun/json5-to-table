const fillSchemaSize = require('./helpers/fillSchemaSize')
const retrieveProperty = require('./helpers/retrieveProperty')

// 占满行，动态占据列
function fillData (data, schema, matrix) {
  if (!('size' in schema)) {
    schema = fillSchemaSize(schema)
  }

  if (Array.isArray(data)) {
    let rowStartOfEveryItem = 0
    const rowOccupiesOfEveryItem = Math.floor(matrix.rows / data.length)
    const arrayOfOccupyCols = []

    for (const arrayItem of data) {
      const occupyCols = fillData(arrayItem, schema, matrix.subview(rowStartOfEveryItem, 0, rowOccupiesOfEveryItem, matrix.cols))
      arrayOfOccupyCols.push(occupyCols)
      rowStartOfEveryItem += rowOccupiesOfEveryItem
    }

    if (Math.max(...arrayOfOccupyCols) > schema.size[1]) {
      throw new Error('遇到断言错误：数组中填充时用到的空间不与 schema 定义的空间一致')
    }

    // 余下不能被整除的部分合并为单个单元格
    if (rowStartOfEveryItem < matrix.rows) {
      matrix.setVal(rowStartOfEveryItem, 0, { val: undefined, rowSpan: matrix.rows - rowStartOfEveryItem, colSpan: schema.size[1] })
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
