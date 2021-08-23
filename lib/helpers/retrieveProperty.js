const flatten = require('lodash.flatten')

function retrieveProperty (object, path) {
  if (path === '') {
    return object
  }

  const values = retrievePropertyAsArray(object, path)
  if (values.length === 0) {
    return undefined
  } else if (values.length === 1) {
    return values[0]
  } else {
    return values
  }
}

// 从 object 中提取属性，总是以数组形式返回。
// 如果 object 是 null 或 undefined，返回 [undefined].
// 如果 object 是空数组，返回 [].
function retrievePropertyAsArray (object, path) {
  if (Array.isArray(object)) {
    // 从数组中提取属性
    const values = object.map(objectItem => retrievePropertyAsArray(objectItem, path))
    return flatten(values)
  }

  if (object === undefined || object === null) {
    return [undefined]
  }

  // 只分割第一个`.`；如果路径中不存在`.`，则 remainingProperty 等于 undefined
  const [prop, remainingProp] = path.replace('.', '<br>').split('<br>') 
  const value = object[prop]
  if (remainingProp) {
    return retrievePropertyAsArray(value, remainingProp)
  } else {
    return [value]
  }
}

module.exports = retrieveProperty
