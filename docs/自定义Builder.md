### 自定义Builder

输出HTML源码只是工具提供的最基本的格式。实际上，可以通过编写Builder支持更多的输出格式，如Excel等等。下面是一个简单的示例，它输出`<table>`、`<row>`、`<col>`这样的XML格式。

```js
const { jsonToTable } = require('json-to-table')

class Builder {
  constructor () {
    this.indent = 0
  }

  table (next) {
    this._wrap('table', next)
  }

  head (next) {
    this._wrap('table', next)
  }

  body (next) {
    this._wrap('table', next)
  }

  row  (next) {
    this._wrap('row', next)
  }

  cell (data, at) {
    this._writeLine(`<col>${data}</col>`)
  }

  _wrap (tag, next) {
    this._writeLine(`<${tag}>`)
    this.indent++
    next()
    this.indent--
    this._writeLine(`</${tag}>`)
  }

  _writeLine (line) {
    const spaces = new Array(this.indent * 2).fill(' ').join('')
    console.log(spaces + line)
  }
}

const data = [
  {
    a: 1,
    b: 2
  },
  {
    a: 3,
    b: 4
  }
]
const builder = new Builder()
jsonToTable(data, builder)
```

输出

```html
<table>
  <table>
    <row>
      <col>a</col>
      <col>b</col>
    </row>
  </table>
  <table>
    <row>
      <col>1</col>
      <col>2</col>
    </row>
    <row>
      <col>3</col>
      <col>4</col>
    </row>
  </table>
</table>
```

一个Builder是一个对象，其中要定义`table`、`head`、`body`、`row`、`cell`五个方法，分别对应表格的表格、表头、表体、行和单元格的处理段。

- `table(next)`：进入table的处理段，调用next方法才会进入到下一层的处理段。
- `head(next)`：进入head的处理段，调用next方法才会进入到下一层的处理段。
- `body(next)`：进入body的处理段，调用next方法才会进入到下一层的处理段。
- `row(next)`：进入row的处理段，调用next方法才会进入到下一层的处理段。
- `cell(data, at)`：进入单元格的处理段，data是该单元格的数据，at包含三个参数：

    - `rowSpan`: 该单元格纵跨的行数
    - `colSpan`：该单元格横跨的列数
    - `isHead`：该单元格是否位于表头，否则就在表体内
