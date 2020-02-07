// 前置条件：props 参数是全面的对象

const deepClone = require('lodash.clonedeep')
const { AddressableCells } = require('./table_defs')

function calcPropsDepth (props) {
  if (props) {
    const depth = Math.max(
      ...props.map(
        prop => 1 + calcPropsDepth(prop.props)
      )
    )
    props.depth = depth
    return depth
  } else {
    return 0
  }
}

function generateCells (props, availableRowSpan, rowFrom, colFrom) {
  const originalColFrom = colFrom
  const cells = []
  
  props.forEach((prop, index) => {
    if (prop.props) {
      const occupiedRowSpan = prop.props.depth + 1
      const usedRowSpan = Math.ceil(availableRowSpan / occupiedRowSpan)

      const [cellsOfProps, colSpan] = generateCells(
        prop.props, availableRowSpan - usedRowSpan, rowFrom + usedRowSpan, colFrom)
      cells.push({ r: rowFrom, c: colFrom, rs: usedRowSpan, cs: colSpan, v: prop.title })
      cells.push(...cellsOfProps)
      colFrom += colSpan
    } else {
      cells.push({ r: rowFrom, c: colFrom, rs: availableRowSpan, v: prop.title })
      colFrom += 1
    }
  })
  return [cells, colFrom - originalColFrom]
}

module.exports = function (props) {
  props = deepClone(props)
  const rowSpan = calcPropsDepth(props)
  const cells =  generateCells(props, rowSpan, 1, 1)[0]
  return new AddressableCells(...cells)
}
