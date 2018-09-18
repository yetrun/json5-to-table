const test = require('ava')
const fixtures = require('./fixtures')
const dataToMeta = require('../src/dataToMeta')
const Meta = require('../src/Meta')

test('simple data to meta', t => {
  const data = fixtures.data.simple[0]
  const meta = dataToMeta(data)
  t.deepEqual(meta, new Meta({
    order: ['a', 'b']
  }))
})

test('nested data to meta', t => {
  const data = fixtures.data.nested[0]
  const meta = dataToMeta(data)
  t.deepEqual(meta, new Meta({
    order: ['a', 'b'],
    mapping: {
      b: {
        meta: {
          order: ['c', 'd']
        }
      }
    }
  }))
})

test('simple array data to meta', t => {
  const data = fixtures.data.simple
  const meta = dataToMeta(data)
  t.deepEqual(meta, new Meta({
    order: ['a', 'b', 'c']
  }))
})

test('nested array data to meta', t => {
  const data = fixtures.data.nested
  const meta = dataToMeta(data)
  t.deepEqual(meta, new Meta({
    order: ['a', 'b'],
    mapping: {
      b: {
        meta: {
          order: ['c', 'd', 'e']
        }
      }
    }
  }))
})

test('simple primitive array', t => {
  const data = [
    {
      a: 1,
      b: [2, 3]
    },
    {
      a: 4,
      b: [5, 6]
    }
  ]
  const meta = dataToMeta(data)
  t.deepEqual(meta, new Meta({
    order: ['a', 'b']
  }))
})

test('nested primitive array', t => {
  const data = [
    {
      a: 1,
      b: {
        c: [2, 3]
      }
    },
    {
      a: 4,
      b: {
        c: [5, 6]
      }
    }
  ]
  const meta = dataToMeta(data)
  t.deepEqual(meta, new Meta({
    order: ['a', 'b'],
    mapping: {
      b: {
        meta: {
          order: ['c']
        }
      }
    }
  }))
})

test('nested object array', t => {
  const data = fixtures.data.nestedObjectArray[0]
  const meta = dataToMeta(data)
  t.deepEqual(meta, new Meta({
    order: ['a', 'b'],
    mapping: {
      b: {
        meta: {
          order: ['c', 'd']
        }
      }
    }
  }))
})
