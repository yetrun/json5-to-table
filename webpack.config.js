const path = require('path')

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library:{  
      name: "JSON5_TO_TABLE",
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
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
