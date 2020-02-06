// 前置条件：props 参数是全面的对象

const { AddressableCells } = require('./table_defs')
const { isString } = require('../types')

function propsDepth (props) {
  if (props) {
    return Math.max(
      ...props.map(
        prop => 1 + propsDepth(prop.props)
      )
    )
  } else {
    return 0
  }
}

function generateCells (props, rowSpan, rowFrom, colFrom) {
  const originalColFrom = colFrom
  const cells = []
  
  props.forEach((prop, index) => {
    if (prop.props) {
      const [cellsOfProps, colSpan] = generateCells(prop.props, rowSpan - 1, rowFrom + 1, colFrom)
      // TODO: 应该平分行空间
      cells.push({ r: rowFrom, c: colFrom, cs: colSpan, v: prop.title })
      cells.push(...cellsOfProps)
      colFrom += colSpan
    } else {
      cells.push({ r: rowFrom, c: colFrom, rs: rowSpan, v: prop.title })
      colFrom += 1
    }
  })
  return [cells, colFrom - originalColFrom]
}

module.exports = function (props) {
  const rowSpan = propsDepth(props)
  const cells =  generateCells(props, rowSpan, 1, 1)[0]
  return new AddressableCells(...cells)
}
