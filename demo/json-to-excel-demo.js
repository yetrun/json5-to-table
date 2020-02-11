const { jsonToExcel } = JSONToTable

document.getElementById('exportFile').addEventListener('click', function () {
  jsonToExcel(data, null, 'export.xlsx')
})

document.getElementById('generateBlob').addEventListener('click', function () {
  const blob= jsonToExcel(data, null)
  console.log(blob)
})
