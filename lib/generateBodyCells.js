const generateTable = require('./generateTable')
const { Table, Row, Data } = require('./table_body')
const { sortCells } = require('./utils')

function calcRowSpan (entity) {
  if (entity instanceof Table) {
    const rowSpan = entity._rows.reduce((sum, row) => sum + calcRowSpan(row), 0)
    return rowSpan
  } else if (entity instanceof Row) {
    const rowSpans = entity._cells.map(cell => calcRowSpan(cell))
    return Math.max(...rowSpans)
  } else if (entity instanceof Data) {
    return 1
  } else {
    throw new Error('未知的 entity 类型')
  }
}

function convertTable (table, rowSpan, rowFrom, colFrom) {
  const _cells = [] // 让 _cell 命名为 { r: ?, c: ?, v: 1 } 格式
  let restRowCount = table._rows.length
  let colSpanForReturn = null

  for (const row of table._rows) {
    // TODO: 不能均分的
    const currentRowSpan = rowSpan / restRowCount 
    const [_rowCells, colSpan] = convertRow(row, currentRowSpan, rowFrom, colFrom)
    _cells.push(..._rowCells)

    colSpanForReturn = colSpan
    rowSpan -= currentRowSpan
    rowFrom += currentRowSpan
    restRowCount--
  }
  return [_cells, colSpanForReturn]
}

function convertRow (row, rowSpan, rowFrom, colFrom) {
  const originalColFrom = colFrom
  const _cells = []
  for (const cell of row._cells) {
    if (cell instanceof Table) {
      const [_colCells, usedColSpan] = convertTable(cell, rowSpan, rowFrom, colFrom)
      _cells.push(..._colCells)
      colFrom += usedColSpan
    } else {
      const cellOpts = { r: rowFrom, c: colFrom, v: cell._val } 
      if (rowSpan > 1) cellOpts.rs = rowSpan
      _cells.push(cellOpts)
      colFrom += 1
    }
  }
  return [_cells, colFrom - originalColFrom]
}

module.exports = function (data, props) {
  const table = generateTable(data, props)
  const rowSpan = calcRowSpan(table)
  const cells = convertTable(table, rowSpan, 1, 1)[0]
  return sortCells(cells)
}
