const path = require('path')

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library:{  
      name: "jsonToTable",
      type: "umd"
    },
    globalObject: 'this'
  },
  externals: {
    xlsx: {
      commonjs: 'xlsx',
      commonjs2: 'xlsx',
      amd: 'xlsx',
      root: 'XLSX'
    }
  }
}
