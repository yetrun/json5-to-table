const { jsonToHTMLTable } = JSONToTable

const source = jsonToHTMLTable(data, props, { format: 'source' })
document.getElementById('toSource').innerHTML = source

const dom = jsonToHTMLTable(data, props, { format: 'dom' })
document.getElementById('toDom').append(dom)
