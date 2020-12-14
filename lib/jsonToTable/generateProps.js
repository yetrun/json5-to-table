// 根据 data 生成 props

const merge = require('lodash.merge')
const { isObject, isArray } = require('../types')

function generateProps (object) {
  return Object.keys(object).map(key => {
    const prop = { key }
    if (typeof object[key] === 'object') {
      const props = generateProps(object[key])
      if (props.length > 0) {
        prop.props = props
      }
    }
    return prop
  })
}

// 简化数据表示
//
// 该函数将 data 的数据表示予以简化，具体所做的事包括：
// 1. 合并数组为单个对象
// 2. 基本类型的数组视为基本值而不是对象
// 3. 所有属性的值都标识为 true
//
// 示例：
// simplifyObject([
//   { name: 'Jim', info: { listens: [1, 2, 3] } },
//   { name: 'Tom', info: { after: 1 } }
// ])
// => { name: true, info: { listens: true, after: true } }
//
// 前置条件：
// - data 必须得是一个对象或数组
function simplifyObject (data) {
  if (isArray(data)) {
    const simpleObjects = data
      .filter(val => isObject(val) || isArray(val))
      .map(val => simplifyObject(val))
    if (simpleObjects.length === 0) {
      return true
    } else {
      return merge({}, ...simpleObjects)
    }
  } else if (isObject(data)) {
    const object = {}
    Object.keys(data).forEach(key => {
      const val = data[key]
      if (isObject(val) || isArray(val)) {
        object[key] = simplifyObject(val)
      } else {
        object[key] = true
      }
    })
    return object
  } else {
    throw new Error('data 必须得是一个对象或数组' + data)
  }
}

module.exports = function (data) {
  return generateProps(
    simplifyObject(data)
  )
}
