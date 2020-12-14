const test = require('../test')
const generateProps = require('../../lib/jsonToTable/generateProps')

test('object', t => {
  const data = { a: 1, b: 2, c: 3 }

  const props = generateProps(data)
  t.deepEqual(props, [ { key: 'a' }, { key: 'b' }, { key: 'c' } ])
})

test('object -> object', t => {
  const data = { a: 1, b: { c: 2, d: 3 }, e: 4 }

  const props = generateProps(data)
  t.deepEqual(props, [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ])
})

test('array', t => {
  const data = [
    { a: 1, b: 2 },
    { b: 5, c: 6 }
  ]

  const props = generateProps(data)
  t.deepEqual(props, [ { key: 'a' }, { key: 'b' }, { key: 'c' } ])
})

test('array -> array', t => {
  const data = [
    { 
      a: 1, 
      b: [
        { c: 2 },
        { d: 3 }
      ] 
    },
    { 
      b: { d: 4, e: 5 }, // or change to two items array
      f: 6 
    }
  ]

  const props = generateProps(data)
  t.deepEqual(props, [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' }, { key: 'e', } ]
    },
    { key: 'f' }
  ])
})

// 从空数组中生成数据时，不产生内部 props，因为现有代码对于处理空的 props 数组有 Bug
test('generate from empty array value', t => {
  const data = [ { alerts: [] } ]

  const props = generateProps(data)
  t.deepEqual(props, [ { key: 'alerts' }])
})

test('primitive array', t => {
  const data = [
    {
      name: '张三',
      hobby: [ "看书", "看电影", "打篮球" ],
    },
    {
      name: '李四',
      hobby: [ "爬山", "看书" ]
    }
  ]

  const props = generateProps(data)
  t.deepEqual(props, [ { key: 'name' }, { key: 'hobby' } ])
})
