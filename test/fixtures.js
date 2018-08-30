const simpleMeta = {
  order: ['a', 'b'],
  mapping: {
    a: {
      title: 'A'
    },
    b: {
      title: 'B'
    }
  }
}
const simpleData = [
  {
    a: 1,
    b: 2
  },
  {
    a: 3,
    b: 4
  }
]

const nestedMeta = {
  order: ['a', 'b'],
  mapping: {
    a: {
      title: 'A'
    },
    b: {
      title: 'B',
      meta: {
        order: ['c', 'd'],
        mapping: {
          c: {
            title: 'C'
          },
          d: {
            title: 'D'
          }
        }
      }
    }
  }
}
const nestedData = [
  {
    a: 1,
    b: {
      c: 2,
      d: 3
    }
  },
  {
    a: 4,
    b: {
      c: 5,
      d: 6
    }
  }
]

const nestedObjectArrayData = [
  {
    a: 1,
    b: [
      {
        c: 2,
        d: 3
      },
      {
        c: 4,
        d: 5
      },
    ]
  },
  {
    a: 6,
    b: {
      c: 7,
      d: 8
    }
  },
]

module.exports = {
  meta: {
    simple: simpleMeta,
    nested: nestedMeta,
  },
  data: {
    simple: simpleData,
    nested: nestedData,
    nestedObjectArray: nestedObjectArrayData
  }
}
