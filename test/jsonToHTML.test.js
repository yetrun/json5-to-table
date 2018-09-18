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

test('more complex nested json to html source', t => {
  const html = jsonToHTML(meta.complexNested, data.complexNestedObjectArray.slice(0, 1))
  const expected=`<table>
  <thead>
    <tr>
      <th rowSpan="2">A</th>
      <th colSpan="2">B</th>
      <th colSpan="2">C</th>
    </tr>
    <tr>
      <th>D</th>
      <th>E</th>
      <th>F</th>
      <th>G</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3">1</td>
      <td>2</td>
      <td>3</td>
      <td>6</td>
      <td>7</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>8</td>
      <td>9</td>
    </tr>
    <tr>
      <td colSpan="2"></td>
      <td>10</td>
      <td>11</td>
    </tr>
  </tbody>
</table>`
  t.is(html, expected)
})