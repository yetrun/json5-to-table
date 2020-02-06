const Context = require('../Context')
const { showValue } = require('../utils')

function insertHeadCells (context) {
  const thead = document.createElement('thead')
  context.table.appendChild(thead)
  const cells = context.generateHeadCells()
  insertCells(thead, cells, ['tr', 'th'])
}

function insertBodyCells (context, array, props) {
  const tbody = document.createElement('tbody')
  context.table.appendChild(tbody)

  for (item of array) {
    const cells = context.generateDataCells(item)
    insertCells(tbody, cells, ['tr', 'td'])
  }
}

function insertCells (root, cells, [rowTagName, cellTagName]) {
  cells.eachRow(rowCells => {
    const tr = document.createElement(rowTagName)
    root.appendChild(tr)

    rowCells.eachCell(cell => {
      const cellNode = buildCellNode(cell, cellTagName)
      tr.appendChild(cellNode)
    })
  })
}

function buildCellNode (cell, tagName) {
  const node = document.createElement(tagName)
  if (cell.v !== undefined) {
    node.textContent = showValue(cell.v)
  }
  if (cell.rs > 1) {
    node.setAttribute('rowspan', cell.rs)
  }
  if (cell.cs > 1) {
    node.setAttribute('colspan', cell.cs)
  }
  return node
}

module.exports = function (array, props, { replaceWith } = {}) {
  const context = new Context()
  context.table = document.createElement('table')

  if (props) {
    context.initProps(props)
  } else {
    context.initPropsFromData(array.slice(0, 10))
  }

  if (replaceWith) {
    replaceWith = typeof replaceWith === 'string' ? document.querySelector(replaceWith) : replaceWith
    replaceWith.replaceWith(context.table)
  }

  insertHeadCells(context, props)
  insertBodyCells(context, array, props)

  return context.table
}
