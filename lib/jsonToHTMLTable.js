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

function writeBodyPart (lines, array, props) {
  lines.push('  <tbody>')
  for (item of array) {
    writeItemPart(lines, item, props)
  }
  lines.push('  </tbody>')
}

function writeItemPart (lines, item, props) {
  const cells = generateBodyCells(item, props)
  cells.eachRow(rowCells => {
    lines.push('    <tr>')
    rowCells.eachCell(cell => {
      lines.push('      <td>')
      lines.push('        ' + cell.v)
      lines.push('      </td>')
    })
    lines.push('    </tr>')
  })
}

module.exports = function (array, props) {
  const lines = []
  lines.push('<table>')
  writeHeadPart(lines, props)
  writeBodyPart(lines, array, props)
  lines.push('</table>')
  return lines.join('\n')
}
