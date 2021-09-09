const flatten = require('lodash.flatten')
const Matrix = require('./matrix')
const fillSchema = require('./fillSchema')
const fillData = require('./fillData')
const fillSchemaSize = require('./helpers/fillSchemaSize')
const calcDataSize = require('./helpers/calcDataSize')
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

module.exports = generateTable
