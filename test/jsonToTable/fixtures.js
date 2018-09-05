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
    b: 3
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

const complexNestedMeta = {
  order: ['a', 'b', 'c'],
  mapping: {
    a: {
      title: 'A'
    },
    b: {
      title: 'B',
      meta: {
        order: ['d', 'e'],
        mapping: {
          d: {
            title: 'D'
          },
          e: {
            title: 'E'
          }
        }
      }
    },
    c: {
      title: 'C',
      meta: {
        order: ['f', 'g'],
        mapping: {
          f: {
            title: 'F'
          },
          g: {
            title: 'G'
          }
        }
      }
    }
  }
}
const complexNestedObjectArrayData = [
  {
    a: 1,
    b: [
      {
        d: 2,
        e: 3
      },
      {
        d: 4,
        e: 5
      }
    ],
    c: [
      {
        f: 6,
        g: 7
      },
      {
        f: 8,
        g: 9
      },
      {
        f: 10,
        g: 11
      }
    ]
  }
]

module.exports = {
  meta: {
    simple: simpleMeta,
    nested: nestedMeta,
    complexNested: complexNestedMeta
  },
  data: {
    simple: simpleData,
    nested: nestedData,
    nestedObjectArray: nestedObjectArrayData,
    complexNestedObjectArray: complexNestedObjectArrayData
  }
}
