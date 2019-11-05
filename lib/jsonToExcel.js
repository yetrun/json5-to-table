const XLSX = require('xlsx')
const generateHeadCells = require('./generateHeadCells')
const generateBodyCells = require('./generateBodyCells')
const { showValue } = require('./utils')

function generateHeadAoa (props) {
  const cells = generateHeadCells(props)
  return cellsToAoa(cells)
}

function generateDataAoa (data, props, rowFrom) {
  const cells = generateBodyCells(data, props, rowFrom)
  return cellsToAoa(cells)
}

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

  // HACK: 不应该访问内部细节
  const lastCell = cells._cells[cells._cells.length - 1]
  const nextRow = lastCell.r + lastCell.rs
  return [aoa, merges, nextRow]
}

module.exports = function (array, props, path) {
  const [headAoa, headMerges, bodyRowFrom] = generateHeadAoa(props)
  const ws = XLSX.utils.aoa_to_sheet(headAoa)
  ws['!merges'] = headMerges

  let nextRow = bodyRowFrom
  for (item of array) {
    const [dataAoa, dataMerges, _nextRow] = generateDataAoa(item, props, nextRow)
    XLSX.utils.sheet_add_aoa(ws, dataAoa, { origin: -1 })
    ws['!merges'].push(...dataMerges)
    nextRow = _nextRow
  }

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, path)
}
