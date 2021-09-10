// 将文件后缀修改为 test.js 后再执行

const test = require('ava')
const generateExcel = require('../lib/generateExcel')

test('write simple object', t => {
  const schema = [
    { title: 'A', path: 'a' },
    { title: 'B', path: 'b' },
    { title: 'C', path: 'c' }
  ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  generateExcel(data, schema, { writeTo: '/tmp/json-to-table.xlsx' })
  t.pass()
})

test('write object with merged cells', t => {
  const schema = [
    { title: 'A', path: 'a' },
    { title: 'B', path: 'b', props: [
      { title: 'C', path: 'c' },
      { title: 'D', path: 'd' }
    ] }
  ]
  const data = [
    { a: 1, b: [
      { c: 2, d: 3 },
      { c: 4, d: 5 }
    ]}
  ]

  generateExcel(data, schema, { writeTo: '/tmp/json-to-table.xlsx' })
  t.pass()
})
