const flatten = require('lodash.flatten')
const Matrix = require('./matrix')
const fillSchema = require('./fillSchema')
const fillData = require('./fillData')
const fillSchemaSize = require('./helpers/fillSchemaSize')
const retrieveProperty = require('./helpers/retrieveProperty')
const normalizeSchema = require('./normalizeSchema')
const parseToSchema = require('./parseToSchema')

function generateTable (data, schema, options = {}) {
  if (schema === undefined || schema === null) {
    schema = parseToSchema(data, options.parseDataToSchema)
  } else {
    schema = normalizeSchema(schema)
  }
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
  if (!Array.isArray(data)) {
    data = [data]
  }

  let rowStart = 1 + schema.size[0]

  return flatten(
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
  if (Array.isArray(data)) {
    const allSizes = data.map(dataItem => calcDataSize(dataItem, schema))

    return [
      allSizes.map(s => s[0]).reduce((a, b) => a + b, 0),
      schema.size[1] // max(map(allSizes, 1)) <= schema.size[1]
    ]
  }

  if (Array.isArray(schema)) {
    const allSizes = schema.map(schemaItem => calcDataSize(data, schemaItem))

    return [
      Math.max(...allSizes.map(s => s[0])),
      allSizes.map(s => s[1]).reduce((a, b) => a + b)
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
