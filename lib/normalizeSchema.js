const _ = require('lodash')

const allowedKeys = ['title', 'path', 'props', 'meta']

function normalizeSchema (schema) {
  if (_.isArray(schema)) {
    return schema.map(schemaItem => normalizeSchema(schemaItem))
  } else if (_.isPlainObject(schema)) {
    const extraKeys = _.difference(Object.keys(schema), allowedKeys)
    if (!_.isEmpty(extraKeys)) {
      throw new Error(`未知的 schema 键：${extraKeys.join(', ')}`)
    }

    if (!('path' in schema)) {
      throw new Error('schema 一定要设置 `path` 值')
    }

    if (!('title' in schema)) {
      schema = { title: schema.path, ...schema }
    }

    if ('props' in schema) {
      schema = { ...schema, props: normalizeSchema(schema.props)}
    }

    return schema
  } else if (_.isString(schema)) {
    return { title: schema, path: schema }
  } else if (_.isNil(schema)) {
    return schema
  } else {
    return schema.toString()
  }
}

module.exports = normalizeSchema
