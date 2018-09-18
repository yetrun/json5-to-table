# json-to-table

支持任意嵌套格式的JSON数据转化为表格显示，嵌套的JSON会以合并的单元格形式展示。

## 快速使用

安装

    npm install json-to-table --save

引入

```js
const { jsonToHTML } = require('json-to-table')

const data = [
  {
    a: 1,
    b: {
      c: 2,
      d: 3
    }
  },
  {
    a: 4,
    b: {
      c: 5,
      d: 6
    }
  }
]
const html = jsonToHTML(data)
console.log(html)
```

显示效果

<table>
  <thead>
    <tr>
      <th rowSpan="2">a</th>
      <th colSpan="2">b</th>
    </tr>
    <tr>
      <th>c</th>
      <th>d</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>

<details>
<summary>点击查看生成的源码</summary>

```html
<table>
  <thead>
    <tr>
      <th rowSpan="2">a</th>
      <th colSpan="2">b</th>
    </tr>
    <tr>
      <th>c</th>
      <th>d</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
```
</details>## 更多的JSON格式

### 简单格式

```js
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
```

显示效果

<table>
  <thead>
    <tr>
      <th>a</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>3</td>
      <td>4</td>
    </tr>
  </tbody>
</table>

<details>
<summary>点击查看生成源码</summary>

```html
<table>
  <thead>
    <tr>
      <th>a</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>3</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
```
</details>

### 嵌套格式

```js
const data = [
  {
    a: 1,
    b: {
      c: 2,
      d: 3
    }
  },
  {
    a: 4,
    b: {
      c: 5,
      d: 6
    }
  }
]
```

显示效果

<table>
  <thead>
    <tr>
      <th rowSpan="2">a</th>
      <th colSpan="2">b</th>
    </tr>
    <tr>
      <th>c</th>
      <th>d</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>

<details>
<summary>点击查看生成源码</summary>
```html
<table>
  <thead>
    <tr>
      <th rowSpan="2">a</th>
      <th colSpan="2">b</th>
    </tr>
    <tr>
      <th>c</th>
      <th>d</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
```
</details>

### 更复杂的嵌套数组的格式

```js
const data = [
  {
    a: 1,
    b: [
      {
        d: 2,
        e: 3
      },
      {
        d: 4,
        e: 5
      }
    ],
    c: [
      {
        f: 6,
        g: 7
      },
      {
        f: 8,
        g: 9
      },
      {
        f: 10,
        g: 11
      }
    ]
  }
]
```

显示效果

<table>
  <thead>
    <tr>
      <th rowSpan="2">a</th>
      <th colSpan="2">b</th>
      <th colSpan="2">c</th>
    </tr>
    <tr>
      <th>d</th>
      <th>e</th>
      <th>f</th>
      <th>g</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3">1</td>
      <td>2</td>
      <td>3</td>
      <td>6</td>
      <td>7</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>8</td>
      <td>9</td>
    </tr>
    <tr>
      <td colSpan="2"></td>
      <td>10</td>
      <td>11</td>
    </tr>
  </tbody>
</table>

<details>
<summary>点击查看生成源码</summary>

```html
<table>
  <thead>
    <tr>
      <th rowSpan="2">a</th>
      <th colSpan="2">b</th>
      <th colSpan="2">c</th>
    </tr>
    <tr>
      <th>d</th>
      <th>e</th>
      <th>f</th>
      <th>g</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3">1</td>
      <td>2</td>
      <td>3</td>
      <td>6</td>
      <td>7</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>8</td>
      <td>9</td>
    </tr>
    <tr>
      <td colSpan="2"></td>
      <td>10</td>
      <td>11</td>
    </tr>
  </tbody>
</table>
```
</details>
## 定义Meta

我们可以规定Meta的格式来收获我们想要的格式。如简单的格式：

```js
const { jsonToHTML } = require('json-to-table')

const meta = {
  order: ['a', 'b'],
  mapping: {
    a: {
      title: 'A'
    },
    b: {
      title: 'B'
    }
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
const html = jsonToHTML(meta, data)
console.log(html)
```

显示效果 

<table>
  <thead>
    <tr>
      <th>A</th>
      <th>B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>3</td>
      <td>4</td>
    </tr>
  </tbody>
</table>

<details>
<summary>点击查看生成源码</summary>

```html
<table>
  <thead>
    <tr>
      <th>A</th>
      <th>B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>3</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
```
</details>

再如嵌套的格式：

```js
const { jsonToHTML } = require('json-to-table')

const meta = {
  order: ['a', 'b'],
  mapping: {
    a: {
      title: 'A'
    },
    b: {
      title: 'B',
      meta: {
        order: ['c', 'd'],
        mapping: {
          c: {
            title: 'C'
          },
          d: {
            title: 'D'
          }
        }
      }
    }
  }
}
const data = [
  {
    a: 1,
    b: {
      c: 2,
      d: 3
    }
  },
  {
    a: 4,
    b: {
      c: 5,
      d: 6
    }
  }
]
const html = jsonToHTML(meta, data)
console.log(html)
```

显示效果

<table>
  <thead>
    <tr>
      <th rowSpan="2">A</th>
      <th colSpan="2">B</th>
    </tr>
    <tr>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>

<details>
<summary>点击查看生成源码</summary>

```html
<table>
  <thead>
    <tr>
      <th rowSpan="2">A</th>
      <th colSpan="2">B</th>
    </tr>
    <tr>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
```
</details>

### Meta简写格式

如果只有一个title属性，则Meta可以简写为：

```js
const meta = {
  order: ['a', 'b'],
  mapping: {
    a: 'A',
    b: 'B'
  }
}
```

order可以省略，这时列顺序不可保证，一般来讲是写入的顺序：

```js
const meta = {
  mapping: {
    a: {
      title: 'A'
    }
    b: {
      title: 'B'
    }
  }
}
```

省略mapping的写法也是支持的，下面两者等价：

```js
const meta1 = {
  order: ['a', 'b']
}

const meta2 = {
  order: ['a', 'b'],
  mapping: {
    a: 'a',
    b: 'b'
  }
}
```
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

## 依赖

### 生成文档

    pip install MarkdownPP

## License

LGPL-2.1
