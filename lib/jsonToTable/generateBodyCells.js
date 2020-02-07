// 前置条件：props 参数是全面的对象

const generateTable = require('./generateTableObject')
const { Table, Row, Data, AddressableCells } = require('./table_defs')

function calcRowSpan (entity) {
  if (entity instanceof Table) {
    entity.occupiedRowSpan = entity._rows.reduce((sum, row) => sum + calcRowSpan(row), 0)
  } else if (entity instanceof Row) {
    const occupiedRowSpans = entity._cells.map(cell => calcRowSpan(cell))
    entity.occupiedRowSpan = Math.max(...occupiedRowSpans)
  } else if (entity instanceof Data) {
    entity.occupiedRowSpan = 1
  } else {
    throw new Error('未知的 entity 类型')
  }
  return entity.occupiedRowSpan
}

function calcRowSpanFactor (rows, availableRowSpan) {
  const totalOccupied = rows.reduce((accumulate, row) => accumulate + row.occupiedRowSpan, 0)
  return Math.floor(availableRowSpan / totalOccupied)
}

function convertTable (table, rowFrom, colFrom, availableRowSpan) {
  const _cells = []
  let usedColSpan = null

  let currentRowFrom = rowFrom
  const factor = calcRowSpanFactor(table._rows, availableRowSpan)
  for (const row of table._rows) {
    const usedRowSpan = row.occupiedRowSpan * factor
    const [_rowCells, colSpan] = convertRow(row, currentRowFrom, colFrom, usedRowSpan)
    _cells.push(..._rowCells)

    usedColSpan = colSpan
    currentRowFrom += usedRowSpan 
  }

  // 下面没有用到的行合并为一个空的单元格
  if (currentRowFrom < rowFrom + availableRowSpan) {
    _cells.push({ 
      r: currentRowFrom, c: colFrom, 
      rs: rowFrom + availableRowSpan - currentRowFrom, cs: usedColSpan 
    })
  }

  return [_cells, usedColSpan]
}

function convertRow (row, rowFrom, colFrom, availableRowSpan) {
  const originalColFrom = colFrom
  const _cells = []
  for (const cell of row._cells) {
    if (cell instanceof Table) {
      const [_colCells, usedColSpan] = convertTable(cell, rowFrom, colFrom, availableRowSpan) // 务必用完
      _cells.push(..._colCells)

      colFrom += usedColSpan
    } else {
      const _cell = { r: rowFrom, c: colFrom, rs: availableRowSpan, v: cell._val } 
      _cells.push(_cell)
      colFrom += 1
    }
  }
  return [_cells, colFrom - originalColFrom]
}

module.exports = function (data, props, rowFrom = 1) {
  const table = generateTable(data, props)
  calcRowSpan(table)
  const cells = convertTable(table, rowFrom, 1, table.occupiedRowSpan)[0]
  return new AddressableCells(...cells)
}
