/* 这是利用 Context 实现 jsonToTable 的最简单示例，它没有任何实际意义，仅仅作为测试。
 * 
 * Context 封装了 generateHeadCells 和 generateBodyCells，并处理好行号的问题。在利
 * 用 Context 实现其他格式的 jsonToTable 时（如 jsonToHTMLTable），只需要处理好 value
 * 的渲染即可。注意，value 的类型包括：
 * 
 * - Boolean
 * - Number
 * - String
 * - Object
 * - Array
 * - null
 * - undefined
 */

const { Context } = require('.')

module.exports = function (array, props) {
  const context = new Context()
  context.rows = []

  if (props) {
    context.initProps(props)
  } else {
    context.initPropsFromData(array.slice(0, 10))
  }

  context.rows.push(context.generateHeadCells())

  for (item of array) {
    context.rows.push(context.generateDataCells(item))
  }

  return context.rows
}
