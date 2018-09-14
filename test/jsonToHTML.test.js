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
</table>`
  t.is(html, expected)
})

test('nested json to html source', t => {
  const html = jsonToHTML(meta.nested, data.nested.slice(0, 2))
  const expected = `<table>
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
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>`
  t.is(html, expected)
})
