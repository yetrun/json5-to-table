const fs = require('fs')
const { Context } = require('../jsonToTable')
const { isString } = require('../types')

function writeHeadPart (context) {
  context.write(`<thead>`, 1)

  const cells = context.generateHeadCells()
  cells.eachRow(rowCells => {
    context.write('<tr>', 2)
    rowCells.eachCell(cell => {
      context.write(buildCellTag(cell, 'th'), 3)
    })
    context.write('</tr>', 2)
  })

  context.write('</thead>', 1)
}

function writeBodyPart (context, array) {
  context.write('<tbody>', 1)
  for (item of array) {
    writeItemPart(context, item)
  }
  context.write('</tbody>', 1)
}

function writeItemPart (context, item) {
  const cells = context.generateDataCells(item)
  cells.eachRow(rowCells => {
    context.write('<tr>', 2)
    rowCells.eachCell(cell => {
      context.write(buildCellTag(cell, 'td'), 3)
    })
    context.write('</tr>', 2)
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
  tokens.push('>', cell.stringValue, '</', tagName, '>')
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

module.exports = function (array, props, { writeTo, indent } = {}) {
  let endOnReturn = false
  indent = indent || 2

  const context = new Context()

  if (writeTo && isString(writeTo)) {
    context.writer = fs.createWriteStream(writeTo)
    endOnReturn = true
  } else if (writeTo) {
    context.writer = writeTo
  } else {
    context.writer = new StringWriter()
  }

  context.write = function (str, indentLevel = 0) {
    const spaces = ' '.repeat(indent * indentLevel)
    context.writer.write(`${spaces}${str}\n`)
  }

  if (props) {
    context.initProps(props)
  } else {
    context.initPropsFromData(array.slice(0, 10))
  }

  context.write('<table>')
  writeHeadPart(context, props)
  writeBodyPart(context, array, props)
  context.write('</table>')

  if (!writeTo) {
    return context.writer.content
  } else {
    if (endOnReturn) context.writer.end()
    return context.writer
  }
}
