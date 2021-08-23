const generateTable = require('./generateTable')

const tagNames = ['table', 'thead', 'tbody', 'tr', 'thead.tr', 'tbody.tr', 'th', 'td']

class Writer {
  constructor () {
    this.indent = 0
    this.lines = []
  }

  begin (tagName, attributes) {
    const startTagInner = [tagName, getAttributesText(attributes)].filter(val => val).join(' ')
    const startTag = `<${startTagInner}>`
    this.write(startTag)

    this.indent++
  }

  end (tagName) {
    this.indent--

    const endTag = `</${tagName}>`
    this.write(endTag)
  }

  write (line) {
    line = new Array(this.indent * 2).fill(' ').join('') + line
    this.lines.push(line)
  }

  toString () {
    return this.lines.join('\n')
  }
}

function makeAttributesOption (attributes = {}) {
  return tagNames.reduce((_attributes, tagName) => {
    _attributes[tagName] = attributes[tagName]
    return _attributes
  }, {})
}

function generateHTMLTable (data, schema, options = {}) {
  const writer = new Writer()
  const table = generateTable(data, schema, options)
  const attributesOption = makeAttributesOption(options.attributes)

  writer.begin('table', attributesOption.table)
  writeTablePart(writer, table.header, ['thead', 'tr', 'th'], attributesOption)
  writeTablePart(writer, table.body, ['tbody', 'tr', 'td'], attributesOption)
  writer.end('table')

  return writer.toString()
}

// write 完整的 thead 或 tbody 部分
function writeTablePart (writer, rows, [partName, rowName, cellName], attributesOption) {
  const rowAttributes = { ...attributesOption[rowName], ...attributesOption[`${partName}.${rowName}`] }

  writer.begin(partName, attributesOption[partName])
  for (const row of rows) {
    writer.begin(rowName, rowAttributes)
    for (const cell of row) {
      if (cell === undefined) {
        continue
      }

      writer.write(generateCell(cell, cellName, attributesOption[cellName]))
    }
    writer.end(rowName)
  }
  writer.end(partName)
}

// 生成 th 或 td
function generateCell (cell, tagName, attributes) {
  let spans = {}
  if (cell.rowSpan > 1) {
    spans.rowSpan = cell.rowSpan
  }
  if (cell.colSpan > 1) {
    spans.colSpan = cell.colSpan
  }

  const startTag = [tagName, getAttributesText({ ...spans, ...attributes })].filter(val => val).join(' ')

  return `<${startTag}>${showValue(cell.val)}</${tagName}>`
}

function getAttributesText (props) {
  if (props === undefined || props === null) {
    return ''
  } else {
    return Object.entries(props).map(([name, value]) =>  `${name}="${value}"`).join(' ')
  }
}

function showValue (value) {
  if (value === undefined || value === null) {
    return ''
  } else {
    return value.toString()
  }
}

module.exports = generateHTMLTable
