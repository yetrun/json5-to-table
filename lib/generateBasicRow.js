function generateObjectRow (data, props) {
  const row = []
  for (const prop of props) {
    const dataOfProp = data[prop.key]
    if (prop.props) {
      row.push(generateRow(dataOfProp, prop.props))
    } else {
      row.push({ v: dataOfProp })
    }
  }
  return row
}

function generateRow (data, props) {
  if (Array.isArray(data)) {
    return data.map(obj => generateObjectRow(obj, props))
  } else {
    return generateObjectRow(data, props)
  }
}

module.exports = generateRow
