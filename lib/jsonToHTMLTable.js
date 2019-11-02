const generateHeadCells = require('./generateHeadCells')
const generateBodyCells = require('./generateBodyCells')

function writeHeadPart (lines, props) {
  lines.push('  <thead>')

  const cells = generateHeadCells(props)
  cells.eachRow(rowCells => {
    lines.push('    <tr>')
    rowCells.eachCell(cell => {
      lines.push('      <th>')
      lines.push('        ' + cell.v)
      lines.push('      </th>')
    })
    lines.push('    </tr>')
  })

  lines.push('  </thead>')
}

function writeBodyPart (lines, data, props) {
  lines.push('  <tbody>')

  const cells = generateBodyCells(data, props)
  cells.eachRow(rowCells => {
    lines.push('    <tr>')
    rowCells.eachCell(cell => {
      lines.push('      <td>')
      lines.push('        ' + cell.v)
      lines.push('      </td>')
    })
    lines.push('    </tr>')
  })

  lines.push('  </tbody>')
}

module.exports = function (data, props) {
  const lines = []
  lines.push('<table>')
  writeHeadPart(lines, props)
  // TODO: 使用流的方式改写
  writeBodyPart(lines, data, props)
  lines.push('</table>')
  return lines.join('\n')
}
