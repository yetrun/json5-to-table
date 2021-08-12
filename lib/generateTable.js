const _ = require('lodash')
const Matrix = require('./matrix')
const fillSchema = require('./fillSchema')
const fillData = require('./fillData')
const fillSchemaSize = require('./helpers/fillSchemaSize')
const retrieveProperty = require('./helpers/retrieveProperty')

function generateTable (data, schema) {
  schema = fillSchemaSize(schema)

  return {
    header: generateHeader(schema),
    body: generateBody(data, schema)
  }
}

function generateHeader (schema) {
  const matrix = new Matrix(...schema.size)

  // 然后填充矩阵
  fillSchema(schema, matrix)

  // 最后转化 matrix 的数据
  return matrix.map((val, rowIndex, colIndex) => {
    if (val != undefined) {
      return { row: 1 + rowIndex, col: 1 + colIndex, ...val }
    }
  }).toArray()
}

function generateBody (data, schema) {
  if (!_.isArray(data)) {
    data = [data]
  }

  let rowStart = 1 + schema.size[0]

  return _.flatten(
    data.map(dataItem => {
      // 首先确定项目占据的空间大小
      const dataSize = calcDataSize(dataItem, schema)

      // 然后生成行内数据，注意这是二维数组
      const row = generateRow(dataItem, schema, dataSize, rowStart)

      rowStart += dataSize[0]

      return row
    })
  )
}

function generateRow (data, schema, dataSize, rowStart) {
  const matrix = new Matrix(...dataSize)

  // 然后填充矩阵
  fillData(data, schema, matrix)

  // 最后转化 matrix 的数据
  return matrix.map((val, rowIndex, colIndex) => {
    if (val) {
      return { row: rowStart + rowIndex, col: 1 + colIndex, ...val }
    }
  }).toArray()
}

// 按照目前的分析，calcDataSize 对每条数据只会执行一遍，因为 fillData 函数是将
// 数据充满到矩阵中去。
function calcDataSize (data, schema) {
  if (_.isArray(data)) {
    const allSizes = data.map(dataItem => calcDataSize(dataItem, schema))

    if (_.max(_.map(allSizes, 1)) > schema.size[1]) {
      throw new Error('遇到断言错误：数组中数据的空间占用不与 schema 定义的占用一致')
    }
    return [
      _.sum(_.map(allSizes, 0)),
      schema.size[1]
    ]
  }

  if (_.isArray(schema)) {
    const allSizes = schema.map(schemaItem => calcDataSize(data, schemaItem))

    return [
      _.max(_.map(allSizes, 0)),
      _.sum(_.map(allSizes, 1))
    ]
  }

  if (schema.props) {
    const dataItem = retrieveProperty(data, schema.path)
    return calcDataSize(dataItem, schema.props)
  }

  if (schema.size[1] !== 1) {
    throw new Error('遇到断言错误：标量数据的 schema size 应为 [1, 1]')
  }
  return [1, 1]
}

module.exports = generateTable
