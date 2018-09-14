const { isUndef } = require('./isTypes')
const jsonToTable = require('./jsonToTable')

class HTMLBuilder {
  constructor () {
    this.indent = 0
    this.source = ''
  }

  table(next) {
    this.writeLine('<table>')
    this.indent++
    next()
    this.indent--
    this.writeLine('</table>')
  }

  head(next) {
    this.writeLine('<thead>')
    this.indent++
    next()
    this.indent--
    this.writeLine('</thead>')
  }

  body(next) {
    this.writeLine('<tbody>')
    this.indent++
    next()
    this.indent--
    this.writeLine('</tbody>')
  }

  row(next) {
    this.writeLine('<tr>')
    this.indent++
    next()
    this.indent--
    this.writeLine('</tr>')
  }

  col(data, at) {
    data = isUndef(data) ? '' : data
    const tagName = at.isHead ? 'th' : 'td'
    let line = '<' + tagName
    if (at.rowSpan > 1) {
      line += ` rowSpan="${at.rowSpan}"`
    }
    if (at.colSpan > 1) {
      line += ` colSpan="${at.colSpan}"`
    }
    line += '>' + data + '</' + tagName + '>'

    this.writeLine(line)
  }

  writeLine (line) {
    const spaces = new Array(this.indent * 2).fill(' ').join('')
    this.source += `${spaces}${line}\n`
  }
}

function jsonToHTML (meta, data) {
  const builder = new HTMLBuilder()
  jsonToTable(meta, data, builder)
  return builder.source
}

module.exports = jsonToHTML
