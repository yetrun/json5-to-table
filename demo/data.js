const props = [
  { key: 'a' },
  { 
    key: 'b', 
    props: [ { key: 'd' }, { key: 'e' } ]
  },
  { 
    key: 'c', 
    props: [ { key: 'd' }, { key: 'e' }, { key: 'f' } ]
  }
]
const data = [
  {
    a: 1,
    b: [
      { d: 2, e: 3 },
      { d: 4, e: 5 }
    ],
    c: [
      { d: 6, e: 7, f: 8 },
      { d: 9, e: 10, f: 11 },
      { d: 12, e: 13, f: 14 }
    ]
  }
]
