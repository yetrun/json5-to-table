const _ = require('lodash')

// 依然是充满行，不考虑列
function fillSchema (schema, matrix) {
  if (_.isArray(schema)) {
    let colStart = 0

    for (const schemaItem of schema) {
      const occupyCols = fillSchema(schemaItem, matrix.subview(0, colStart))
      colStart += occupyCols
    }

    return colStart
  }

  if (!('depth' in schema)) {
    schema = fillDepths(schema)
  }

  // 优先填充子属性的 schema，已确定 occupyCols
  const occupyRowsOfFirstLevel = Math.ceil(matrix.rows / schema.depth)
  let occupyCols = 1
  if (schema.props) {
    occupyCols = fillSchema(schema.props, matrix.subview(occupyRowsOfFirstLevel, 0))
  }

  matrix.setVal(0, 0, { val: schema.title, rowSpan: occupyRowsOfFirstLevel, colSpan: occupyCols })
  return occupyCols
}

function fillDepths (schema) {
  if (_.isArray(schema)) {
    return schema.map(schemaItem => fillDepths(schemaItem))
  }

  if (schema.props) {
    const schemaItems = fillDepths(schema.props)
    const keys = _.pull(Object.keys(schema), 'props')

    return {
      ..._.pick(schema, keys),
      depth: Math.max(...schemaItems.map(schemaItem => schemaItem.depth)) + 1,
      props: schemaItems
    }
  }

  return {
    ...schema,
    depth: 1
  }
}

module.exports = fillSchema
