const browser = require('./browser')
const node = require('./node')

module.exports = function (data, props, options = {}) {
  let targetFormat = options.targetFormat
  if (!targetFormat) {
    targetFormat = 'document' in global ? 'domNode' : 'sourceCode'
  }

  if (targetFormat === 'domNode') {
    return browser(...arguments)
  } else if (targetFormat === 'sourceCode') {
    return node(...arguments)
  } else {
    throw new Error('未知的 targetFormat：' + targetFormat)
  }
}
