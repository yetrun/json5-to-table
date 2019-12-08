const test = require('./test')
const generateProps = require('../lib/generateProps')

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
  console.log('props', props)
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
