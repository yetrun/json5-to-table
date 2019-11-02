const test = require('ava')
const jsonToHTMLTable = require('../lib/jsonToHTMLTable')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [{ a: 1, b: 2, c: 3 }]

  const htmlTable = jsonToHTMLTable(data, props)
  t.is(htmlTable, 
`<table>
  <thead>
    <tr>
      <th>
        a
      </th>
      <th>
        b
      </th>
      <th>
        c
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        1
      </td>
      <td>
        2
      </td>
      <td>
        3
      </td>
    </tr>
  </tbody>
</table>`)
})
