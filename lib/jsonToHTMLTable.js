const generateHeadCells = require('./generateHeadCells')
const generateBodyCells = require('./generateBodyCells')
const { showValue } = require('./utils')

function writeHeadPart (lines, props) {
  lines.push('  <thead>')

  const cells = generateHeadCells(props)
  cells.eachRow(rowCells => {
    lines.push('    <tr>')
    rowCells.eachCell(cell => {
      lines.push('      ' + buildCellTag(cell, 'th'))
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
      lines.push('      ' + buildCellTag(cell, 'td'))
    })
    lines.push('    </tr>')
  })
}

function buildCellTag (cell, tagName) {
  const tokens = []
  tokens.push('<', tagName)
  if (cell.rs > 1) {
    tokens.push(' rowspan="' + cell.rs + '"')
  }
  if (cell.cs > 1) {
    tokens.push(' colspan="' + cell.cs + '"')
  }
  tokens.push('>', showValue(cell.v), '</', tagName, '>')
  return tokens.join('')
}

module.exports = function (array, props) {
  const lines = []
  lines.push('<table>')
  writeHeadPart(lines, props)
  writeBodyPart(lines, array, props)
  lines.push('</table>')
  return lines.join('\n')
}
