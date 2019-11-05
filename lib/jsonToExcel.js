const XLSX = require('xlsx')
const Context = require('./Context')
const { showValue } = require('./utils')

// 返回 aoa, merges, nextRowNumber
function cellsToAoa (cells) {
  const aoa = []
  const merges = []

  cells.eachRow(rowCells => {
    const array = []
    rowCells.eachCell(cell => {
      array[cell.c - 1] = showValue(cell.v)
      if (cell.rs > 1 || cell.cs > 1) {
        merges.push({ 
          s: { r: cell.r - 1, c: cell.c - 1 }, 
          e: { r: cell.r + cell.rs - 2, c: cell.c + cell.cs - 2 } 
        })
      }
    })
    aoa.push(array)
  })

  return [aoa, merges]
}

module.exports = function (array, props, path) {
  const context = new Context()

  const headCells = context.parseProps(props)
  const [headAoa, headMerges] = cellsToAoa(headCells)
  const ws = XLSX.utils.aoa_to_sheet(headAoa)
  ws['!merges'] = headMerges

  for (const item of array) {
    const itemCells = context.parseNextData(item, props)
    const [dataAoa, dataMerges] = cellsToAoa(itemCells)
    XLSX.utils.sheet_add_aoa(ws, dataAoa, { origin: -1 })
    ws['!merges'].push(...dataMerges)
  }

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, path)
}
