const Context = require('./Context')
const { showValue } = require('./utils')

function writeHeadPart (context, props) {
  context.lines.push('  <thead>')

  const cells = context.parseProps(props)
  cells.eachRow(rowCells => {
    context.lines.push('    <tr>')
    rowCells.eachCell(cell => {
      context.lines.push('      ' + buildCellTag(cell, 'th'))
    })
    context.lines.push('    </tr>')
  })

  context.lines.push('  </thead>')
}

function writeBodyPart (context, array, props) {
  context.lines.push('  <tbody>')
  for (item of array) {
    writeItemPart(context, item, props)
  }
  context.lines.push('  </tbody>')
}

function writeItemPart (context, item, props) {
  const cells = context.parseNextData(item, props)
  cells.eachRow(rowCells => {
    context.lines.push('    <tr>')
    rowCells.eachCell(cell => {
      context.lines.push('      ' + buildCellTag(cell, 'td'))
    })
    context.lines.push('    </tr>')
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

module.exports = function (array, props) {
  const context = new Context()
  context.lines = []

  context.lines.push('<table>')
  writeHeadPart(context, props)
  writeBodyPart(context, array, props)
  context.lines.push('</table>')
  return context.lines.join('\n')
}
