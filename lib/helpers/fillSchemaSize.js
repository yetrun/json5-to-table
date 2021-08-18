const _ = require('lodash')

// 将 size 填充到 schema，这样在 generateTable、fillData、fillSchema 都可以使用
// 数组 schema 将为数组添加 size 属性，这是 JavaScript 所允许的
function fillSchemaSize (schema) {
  if (_.isArray(schema)) {
    const schemaItems = schema.map(schemaItem => fillSchemaSize(schemaItem))
    schemaItems.size = [
      _.max(schemaItems.map(schemaItem => schemaItem.size[0])),
      _.sum(schemaItems.map(schemaItem => schemaItem.size[1]))
    ]
    return schemaItems
  }

  const schemaRowOccupied = schema.title === '' ? 0 : 1

  if (schema.props) {
    const schemaItems = fillSchemaSize(schema.props)

    // 修饰 props
    schema = Object.assign({}, schema)
    schema.props = schemaItems

    // 添加 size 属性
    schema.size = [schemaRowOccupied + schemaItems.size[0], schemaItems.size[1]]

    return schema
  }

  return { ...schema, size: [schemaRowOccupied, 1] }
}

module.exports = fillSchemaSize
