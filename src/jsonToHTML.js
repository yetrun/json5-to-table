const xmlbuilder = require('xmlbuilder')
const jsonToTable = require('./jsonToTable')

class HTMLBuilder {
  table(next) {
    this.xmlbuilder = xmlbuilder.create('table', null, null, { headless: true, allowEmpty: true })
    next()
  }

  head(next) {
    this.xmlbuilder = this.xmlbuilder.ele('thead')
    next()
    this.xmlbuilder = this.xmlbuilder.up()
  }

  body(next) {
    this.xmlbuilder = this.xmlbuilder.ele('tbody')
    next()
    this.xmlbuilder = this.xmlbuilder.up()
  }

  row(next) {
    this.xmlbuilder = this.xmlbuilder.ele('tr')
    next()
    this.xmlbuilder = this.xmlbuilder.up()
  }

  cell(data, at) {
    const tagName = at.isHead ? 'th' : 'td'
    const attrs = {}
    if (at.rowSpan > 1) {
      attrs.rowSpan = at.rowSpan
    }
    if (at.colSpan > 1) {
      attrs.colSpan = at.colSpan
    }
    this.xmlbuilder = this.xmlbuilder.ele(tagName, attrs, data).up()
  }
}

function jsonToHTML (meta, data) {
  const builder = new HTMLBuilder()
  jsonToTable(meta, data, builder)
  return builder.xmlbuilder.end({ pretty: true, allowEmpty: true })
}

module.exports = jsonToHTML
