const generateHeadCells = require('./generateHeadCells')
const generateBodyCells = require('./generateBodyCells')

function writeHeadPart (cells, props) {
  generateHeadCells(props).eachRow(rowCells => {
    const _cells = []
    rowCells.eachCell(cell => {
      _cells.push(Object.assign({}, cell))
    })
    cells.push(_cells)
  })
}

function writeBodyPart (cells, data, props) {
  generateBodyCells(data, props).eachRow(rowCells => {
    const _cells = []
    rowCells.eachCell(cell => {
      _cells.push(Object.assign({}, cell))
    })
    cells.push(_cells)
  })
}

module.exports = function (data, props) {
  const cells = { head: [], body: [] }
  writeHeadPart(cells.head, props)
  writeBodyPart(cells.body, data, props)
  return cells
}
