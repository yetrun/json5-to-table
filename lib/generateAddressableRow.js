// 生成 data row

// 对于复杂的情况，例如：
//   {
//     a: 1, 
//     b: [
//       { c: 2, d: 3 },
//       { c: 4, d: 5 }
//     ], 
//     e: 6
//   }
// 我很容易将其转化为如下的 cells:
//
//  [
//    { r: 1, c: 1, v: 1 },
//    [
//      { r: 1, c: 2, v: 2 },
//      { r: 1, c: 3, v: 

// data maybe a array
function generateVals (data, props) {
  const row = []
  for (const prop of props) {
    const dataOfProp = data[prop.key]
    if (prop.props) {
      const rowOfProp = generateVals(dataOfProp, prop.props)
      row.push(...rowOfProp)
    } else {
      row.push(dataOfProp)
    }
  }
  return row
}

module.exports = function (data, props) {
  if (!Array.isArray(data)) {
    data = [data]
  }

  const cells = []
  data.forEach((obj, objIndex) => {
    const vals = generateVals(obj, props)
    cells.push(...vals.map((val, valIndex) => {
      return { r: objIndex + 1, c: valIndex + 1, v: val}
    }))
  })
  return cells
}
