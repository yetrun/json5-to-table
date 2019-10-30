const { sortCells } = require('./utils')

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
      cells.push({ r: rowFrom, c: colFrom, cs: colSpan, v: prop.key })
      cells.push(...cellsOfProps)
      colFrom += colSpan
    } else {
      const cellOpts = { r: rowFrom, c: colFrom, v: prop.key}
      if (rowSpan > 1) cellOpts.rs = rowSpan
      cells.push(cellOpts)
      colFrom += 1
    }
  })
  return [cells, colFrom - originalColFrom]
}

module.exports = function (props) {
  const rowSpan = propsDepth(props)
  const cells =  generateCells(props, rowSpan, 1, 1)[0]
  return sortCells(cells)
}
