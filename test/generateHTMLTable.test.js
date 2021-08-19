const test = require('ava')
const generateHTMLTable = require('../lib/generateHTMLTable')

function stripText(text) {
  const lines = text.split('\n')

  // 删除前面的空白行
  lines.splice(0, lines.findIndex(line => /\S/.test(line)))

  // 找到第一行的缩进数
  const indent = lines[0].match(/^\s*/)[0].length
  return lines.map(line => line.substr(indent)).join('\n')
}

test('generate html table', t => {
  const schema = [
    { title: 'A', path: 'a' },
    { title: 'B', path: 'b' },
    { title: 'C', path: 'c' }
  ]
  const data = [
    { a: 1, b: 's', c: null }, // 数字、字符串、Null
    { a: undefined, b: { s: 1, t: 2 }, c: [1, 2] } // Undefined、对象、数组
  ]

  const htmlTable = generateHTMLTable(data, schema)
  t.is(htmlTable, stripText(`
    <table>
      <thead>
        <tr>
          <th>A</th>
          <th>B</th>
          <th>C</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>s</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>[object Object]</td>
          <td>1,2</td>
        </tr>
      </tbody>
    </table>`
  ))
})

test('generate html table for complex object array', t => {
  const schema = [
    { title: 'A', path: 'a' },
    { title: 'B', path: 'b', props: [
      { title: 'C', path: 'c' },
      { title: 'D', path: 'd' }
    ] }
  ]
  const data = [
    {
      a: 1,
      b: [
        { c: 2, d: 3 },
        { c: 4, d: 5 }
      ]
    },
    {
      a: 6,
      b: [
        { c: 7, d: 8 }
      ]
    }
  ]

  const htmlTable = generateHTMLTable(data, schema)
  t.is(htmlTable, stripText(`
    <table>
      <thead>
        <tr>
          <th rowSpan="2">A</th>
          <th colSpan="2">B</th>
        </tr>
        <tr>
          <th>C</th>
          <th>D</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan="2">1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>5</td>
        </tr>
        <tr>
          <td>6</td>
          <td>7</td>
          <td>8</td>
        </tr>
      </tbody>
    </table>`
  ))
})

test('receive generateTable options', t => {
  const data = {
    a: {
      b: 1, c: 2
    }
  }

  const htmlTable = generateHTMLTable(data, null, { parseDataToSchema: 'flatten' })
  t.is(htmlTable, stripText(`
    <table>
      <thead>
        <tr>
          <th>a.b</th>
          <th>a.c</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>`
  ))
})

test('receive class option', t => {
  const schema = [
    { title: 'A', path: 'a' },
    { title: 'B', path: 'b' },
  ]
  const data = [
    { a: 1, b: 2 },
    { a: 3, b: 4 }
  ]

  const htmlTable = generateHTMLTable(data, schema, { 
    attributes: {
      table: { class: 'c-table' }, 
      thead: { class: 'c-table-header' }, 
      tbody: { class: 'c-table-body' },
      tr: { class: 'c-table-row' },
      'thead.tr': { style: 'font-size: 15px' },
      'tbody.tr': { class: 'c-data-row', style: 'font-size: 14px' }, // tbody.tr 覆盖 tr
      th: { class: 'c-header-cell' },
      td: { class: 'c-data-cell' }
    }
  })
  t.is(htmlTable, stripText(`
    <table class="c-table">
      <thead class="c-table-header">
        <tr class="c-table-row" style="font-size: 15px">
          <th class="c-header-cell">A</th>
          <th class="c-header-cell">B</th>
        </tr>
      </thead>
      <tbody class="c-table-body">
        <tr class="c-data-row" style="font-size: 14px">
          <td class="c-data-cell">1</td>
          <td class="c-data-cell">2</td>
        </tr>
        <tr class="c-data-row" style="font-size: 14px">
          <td class="c-data-cell">3</td>
          <td class="c-data-cell">4</td>
        </tr>
      </tbody>
    </table>`
  ))
})
