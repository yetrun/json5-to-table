const test = require('ava')
const Meta = require('../src/Meta')

test('new meta from full simple meta', t => {
  const meta = new Meta({
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B'
      }
    }
  })
  t.deepEqual(meta.toJSON(), {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B'
      }
    }
  })
})

test('auto filter not listed property of mapping', t => {
  const meta = new Meta({
    order: ['a'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B'
      }
    }
  })
  t.deepEqual(meta.toJSON(), {
    order: ['a'],
    mapping: {
      a: {
        title: 'A'
      }
    }
  })
})

test('auto detect order from mapping', t => {
  const meta = new Meta({
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B'
      }
    }
  })
  t.deepEqual(meta.toJSON(), {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B'
      }
    }
  })
})

test('auto detect order and mapping from plain object', t => {
  const meta = new Meta({
    a: {
      title: 'A'
    },
    b: {
      title: 'B'
    }
  })
  t.deepEqual(meta.toJSON(), {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B'
      }
    }
  })
})

test('auto assign default mapping if not provided', t => {
  const meta = new Meta({
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      }
    }
  })
  t.deepEqual(meta.toJSON(), {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'b'
      }
    }
  })
})

test('auto assign string as title', t => {
  const meta = new Meta({
    order: ['a', 'b'],
    mapping: {
      a: 'A',
      b: 'B'
    }
  })
  t.deepEqual(meta.toJSON(), {
    order: ['a', 'b'],
    mapping: {
      a: {
        title: 'A'
      },
      b: {
        title: 'B'
      }
    }
  })
})
