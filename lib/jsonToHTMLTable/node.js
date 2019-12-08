const generateProps = require('../generateProps')
const Context = require('../Context')
const { showValue } = require('../utils')

function writeHeadPart (context, props) {
  context.writer.write('  <thead>\n')

  const cells = context.parseProps(props)
  cells.eachRow(rowCells => {
    context.writer.write('    <tr>\n')
    rowCells.eachCell(cell => {
      context.writer.write('      ' + buildCellTag(cell, 'th') + '\n')
    })
    context.writer.write('    </tr>\n')
  })

  context.writer.write('  </thead>\n')
}

function writeBodyPart (context, array, props) {
  context.writer.write('  <tbody>\n')
  for (item of array) {
    writeItemPart(context, item, props)
  }
  context.writer.write('  </tbody>\n')
}

function writeItemPart (context, item, props) {
  const cells = context.parseNextData(item, props)
  cells.eachRow(rowCells => {
    context.writer.write('    <tr>\n')
    rowCells.eachCell(cell => {
      context.writer.write('      ' + buildCellTag(cell, 'td') + '\n')
    })
    context.writer.write('    </tr>\n')
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

class StringWriter {
  constructor () {
    this.content = ''
  }
  write (text) {
    this.content += text
  }
}

module.exports = function (array, props, { writeTo } = {}) {
  if (!props) {
    props = generateProps(array.slice(0, 10))
  }

  const context = new Context()
  context.writer = writeTo ? writeTo : new StringWriter()

  // TODO: webpack 打包的时候如何考虑 node 和 browser 环境

  context.writer.write('<table>\n')
  writeHeadPart(context, props)
  writeBodyPart(context, array, props)
  context.writer.write('</table>\n')

  if (!writeTo) {
    return context.writer.content
  }
}
