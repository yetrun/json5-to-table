// TODO: webpack 打包的时候如何考虑 browser 和 dom 环境

const toDom = require('./toDom')
const toSource = require('./toSource')

module.exports = function (data, props, options = {}) {
  let format = options.format
  if (!format) {
    format = typeof window === 'object' ? 'dom' : 'source'
  }

  if (format === 'dom') {
    return toDom(...arguments)
  } else if (format === 'source') {
    return toSource(...arguments)
  } else {
    throw new Error('未知的 format：' + format)
  }
}
