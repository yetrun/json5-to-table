const XLSX = require('xlsx')
const { Context } = require('./jsonToTable')
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

module.exports = function (array, props, toPath) {
  const context = new Context()

  if (props) {
    context.initProps(props)
  } else {
    context.initPropsFromData(array.slice(0, 10))
  }

  const headCells = context.generateHeadCells()
  const [headAoa, headMerges] = cellsToAoa(headCells)
  const ws = XLSX.utils.aoa_to_sheet(headAoa)
  ws['!merges'] = headMerges

  for (const item of array) {
    const itemCells = context.generateDataCells(item)
    const [dataAoa, dataMerges] = cellsToAoa(itemCells)
    XLSX.utils.sheet_add_aoa(ws, dataAoa, { origin: -1 })
    ws['!merges'].push(...dataMerges)
  }

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  if (toPath) {
    return XLSX.writeFile(wb, toPath)
  } else {
    return XLSX.write(wb, { type: 'buffer' })
  }
}
