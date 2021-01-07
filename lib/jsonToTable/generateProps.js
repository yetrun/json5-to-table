// 根据 data 生成 props

const merge = require('lodash.merge')
const { isObject, isArray } = require('../types')

// object 一定是一个对象，且其每个属性的值也是对象。
// 只不过，我们用空对象`{}`指代基本属性。
function generateProps (object) {
  return Object.keys(object).map(key => {
    const prop = { key }

    const props = generateProps(object[key])
    if (props.length > 0) {
      prop.props = props
    }

    return prop
  })
}

// 简化数据表示：数据表示完全用对象的形式表示，数组通过合并展示为必要的表示，基本类型使用空对象`{}`表示。
//
// 示例：
// simplifyObject([
//   { name: 'Jim', info: { listens: [1, 2, 3] } },
//   { name: 'Tom', info: { after: 1 } }
// ])
// => { name: {}, info: { listens: {}, after: {} } }
//
// 前置条件：
// - data 必须得是一个对象或数组
function simplifyObject (data) {
  if (isArray(data)) {
    const simpleObjects = data
      .filter(val => isObject(val) || isArray(val))
      .map(val => simplifyObject(val))
    if (simpleObjects.length === 0) {
      return {}
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
  const obj = simplifyObject(data)
  return generateProps(obj)
}
