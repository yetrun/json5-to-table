const fillSchemaSize = require('./helpers/fillSchemaSize')

// 依然是充满行，不考虑列
function fillSchema (schema, matrix) {
  if (!('size' in schema)) {
    schema = fillSchemaSize(schema)
  }

  if (Array.isArray(schema)) {
    let colStart = 0

    for (const schemaItem of schema) {
      const occupyCols = fillSchema(schemaItem, matrix.subview(0, colStart))
      colStart += occupyCols
    }

    return colStart
  }

  // 优先填充子属性的 schema，已确定 occupyCols
  const occupyRowsOfFirstLevel = Math.ceil(matrix.rows / schema.size[0])
  let occupyCols = 1
  if (schema.props) {
    occupyCols = fillSchema(schema.props, matrix.subview(occupyRowsOfFirstLevel, 0))
  }

  if (schema.title !== '') {
    matrix.setVal(0, 0, { val: schema.title, rowSpan: occupyRowsOfFirstLevel, colSpan: occupyCols })
  }
  return occupyCols
}

module.exports = fillSchema
