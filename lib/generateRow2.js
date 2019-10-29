function generateObjectRow (data, props) {
  const row = []
  for (const prop of props) {
    const dataOfProp = data[prop.key]
    if (prop.props) {
      const rowOfProp = generateRow(dataOfProp, prop.props)
      row.push(...rowOfProp)
    } else {
      row.push(dataOfProp)
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
