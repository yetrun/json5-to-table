const fs = require('fs')
const { Context } = require('../jsonToTable')
const { showValue } = require('../utils')
const { isString } = require('../types')

function writeHeadPart (context) {
  context.writer.write('  <thead>\n')

  const cells = context.generateHeadCells()
  cells.eachRow(rowCells => {
    context.writer.write('    <tr>\n')
    rowCells.eachCell(cell => {
      context.writer.write('      ' + buildCellTag(cell, 'th') + '\n')
    })
    context.writer.write('    </tr>\n')
  })

  context.writer.write('  </thead>\n')
}

function writeBodyPart (context, array) {
  context.writer.write('  <tbody>\n')
  for (item of array) {
    writeItemPart(context, item)
  }
  context.writer.write('  </tbody>\n')
}

function writeItemPart (context, item) {
  const cells = context.generateDataCells(item)
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
  let endOnReturn = false

  const context = new Context()
  if (writeTo && isString(writeTo)) {
    context.writer = fs.createWriteStream(writeTo)
    endOnReturn = true
  } else if (writeTo) {
    context.writer = writeTo
  } else {
    context.writer = new StringWriter()
  }

  if (props) {
    context.initProps(props)
  } else {
    context.initPropsFromData(array.slice(0, 10))
  }

  context.writer.write('<table>\n')
  writeHeadPart(context, props)
  writeBodyPart(context, array, props)
  context.writer.write('</table>\n')

  if (!writeTo) {
    return context.writer.content
  } else {
    if (endOnReturn) context.writer.end()
    return context.writer
  }
}
