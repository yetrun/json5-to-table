const { Table, Row, Cell, generateTable } = require('./stack/generateTable')

// 占满行，动态占据列
function fillData (data, schema, matrix) {
  const table = generateTable(data, schema)
  // fillSize(table)
  fillTable(table, matrix)
}

function fillTable (table, matrix) {
  if (table instanceof Table) {
    // 一行一行地添加
    const factor = Math.floor(matrix.rows / table.size[0])

    let rowStart = 0
    for (const row of table.rows) {
      const rowOccupy = row.size[0] * factor
      fillTable(row, matrix.subview(rowStart, 0, rowOccupy))
      rowStart += rowOccupy
    }

    // 余下不能被整除的部分合并为单个单元格
    if (rowStart < matrix.rows) {
      matrix.setVal(rowStart, 0, { val: undefined, rowSpan: matrix.rows - rowStart, colSpan: table.size[1] })
    }
  } else if (table instanceof Row) {
    // 一列一列地添加
    const row = table

    let colStart = 0
    for (const cell of row.cells) {
      fillTable(cell, matrix.subview(0, colStart))
      colStart += cell.size[1]
    }
  } else if (table instanceof Cell){
    // 添加单元格
    const cell = table

    matrix.setVal(0, 0, { val: cell.val, rowSpan: matrix.rows, colSpan: 1 })
  } else {
    throw new Error('table 参数类型异常')
  }
}

module.exports = fillData
