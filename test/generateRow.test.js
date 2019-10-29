// TODO: 如果语法错误没有具体的报错
const test = require('ava')
const generateRow = require('../lib/generateRow')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const cells = generateRow(data, props)
  t.deepEqual(cells, [
    { r: 1, c: 1, v: 1 },
    { r: 1, c: 2, v: 2 },
    { r: 1, c: 3, v: 3 }
  ])
})
