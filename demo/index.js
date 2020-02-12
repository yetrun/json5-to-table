const { jsonToHTMLTable, jsonToExcel } = JSONToTable

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

document.getElementById('html.toSource').addEventListener('click', function () {
  const source = jsonToHTMLTable(data, props, { format: 'source' })
  const sourceContainer = document.getElementById('html.sourceContainer')
  sourceContainer.innerText = source
})

document.getElementById('html.toDom').addEventListener('click', function () {
  const dom = jsonToHTMLTable(data, props, { format: 'dom' })
  const domContainer = document.getElementById('html.domContainer')
  domContainer.append(dom)
})

document.getElementById('excel.exportFile').addEventListener('click', function () {
  jsonToExcel(data, null, 'export.xlsx')
})

document.getElementById('excel.generateBlob').addEventListener('click', function () {
  const blob= jsonToExcel(data, null)
  console.log(blob)
})
