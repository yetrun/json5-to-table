const _ = require('lodash')

// data 必须是对象或者对象数组。我会直接用数组的第一个元素判断是否是对象数组，
// 如果不是对象数组，就当基本值对待。
function parseToSchema (data) {
  data = deepMergeToPlainObject(data)
  return parsePlainObjectToSchema(data)
}

function parsePlainObjectToSchema (data) {
  if (_.isPlainObject(data)) {
    return _.map(data, (dataItem, name) => {
      const props = parsePlainObjectToSchema(dataItem)
      schema = { title: name, path: name, props }
      return _.omitBy(schema, _.isEmpty)
    })
  } else {
    return undefined
  }
}

function deepMergeToPlainObject (data) {
  if (_.isArray(data)) {
    return _.merge({}, ...data.map(dataItem => deepMergeToPlainObject(dataItem)))
  } else if (_.isPlainObject(data)) {
    return _.mapValues(data, deepMergeToPlainObject)
  } else {
    return {}
  }
}

module.exports = parseToSchema
