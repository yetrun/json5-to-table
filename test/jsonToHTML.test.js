const test = require('ava')
const jsonToHTML = require('../src/jsonToHTML')
const { meta, data } = require('./fixtures')

test('simple json to html source', t => {
  const html = jsonToHTML(meta.simple, data.simple.slice(0, 2))
  const expected = `<table>
  <thead>
    <tr>
      <th>A</th>
      <th>B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td></td>
      <td>3</td>
    </tr>
  </tbody>
</table>
`
  t.is(html, expected)
})
