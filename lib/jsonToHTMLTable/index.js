// TODO: webpack 打包的时候如何考虑 node 和 browser 环境

const browser = require('./browser')
const node = require('./node')

module.exports = function (data, props, options = {}) {
  let format = options.format
  if (!format) {
    format = 'document' in global ? 'dom' : 'source'
  }

  if (format === 'dom') {
    return browser(...arguments)
  } else if (format === 'source') {
    return node(...arguments)
  } else {
    throw new Error('未知的 format：' + format)
  }
}
