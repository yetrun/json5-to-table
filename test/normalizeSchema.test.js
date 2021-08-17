const test = require('ava')
const normalizeSchema = require('../lib/normalizeSchema')

test('make the schema to normalize schema', t => {
  const schema = [ 
    'a', // 字符串 schema
    { path: 'b.c' }, // 省略 title
    { title: 'D', path: 'd', props: [ // 内部 props
      'd1',
      { path: 'd2' }
    ]}
  ]

  const normalizedSchema = normalizeSchema(schema)
  t.deepEqual(normalizedSchema, [
    { title: 'a', path: 'a' },
    { title: 'b.c', path: 'b.c' },
    { title: 'D', path: 'd', props: [
      { title: 'd1', path: 'd1' },
      { title: 'd2', path: 'd2' }
    ] }
  ])
})
