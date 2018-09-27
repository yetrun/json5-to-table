# nested-json-to-table

支持任意嵌套格式的JSON数据转化为表格显示，嵌套的JSON会以合并的单元格形式展示。

0.1\.  [快速使用](#快速使用)  
0.2\.  [更多的JSON格式](#更多的json格式)  
0.2.1\.  [简单格式](#简单格式)  
0.2.2\.  [嵌套格式](#嵌套格式)  
0.2.3\.  [更复杂的嵌套数组的格式](#更复杂的嵌套数组的格式)  
0.3\.  [定义Meta](#定义meta)  
0.3.1\.  [Meta简写格式](#meta简写格式)  
0.3.2\.  [自定义Builder](#自定义builder)  
1\.  [函数列表](#函数列表)  
1.1\.  [jsonToHTML](#jsontohtml)  
1.2\.  [jsonToTable](#jsontotable)  
1.3\.  [依赖](#依赖)  
1.3.1\.  [Node版本](#node版本)  
1.3.2\.  [生成文档](#生成文档)  
1.4\.  [License](#license)  

<a name="快速使用"></a>

## 0.1\. 快速使用

安装

    npm install nested-json-to-table --save

引入

```js
const { jsonToHTML } = require('nested-json-to-table')

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
</details>

<a name="更多的json格式"></a>

## 0.2\. 更多的JSON格式

<a name="简单格式"></a>

### 0.2.1\. 简单格式

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

<a name="嵌套格式"></a>

### 0.2.2\. 嵌套格式

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

<a name="更复杂的嵌套数组的格式"></a>

### 0.2.3\. 更复杂的嵌套数组的格式

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

<a name="定义meta"></a>

## 0.3\. 定义Meta

我们可以规定Meta的格式来收获我们想要的格式。如简单的格式：

```js
const { jsonToHTML } = require('nestd-json-to-table')

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
const { jsonToHTML } = require('nested-json-to-table')

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

<a name="meta简写格式"></a>

### 0.3.1\. Meta简写格式

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

<a name="自定义builder"></a>

### 0.3.2\. 自定义Builder

输出HTML源码只是工具提供的最基本的格式。实际上，可以通过编写Builder支持更多的输出格式，如Excel等等。下面是一个简单的示例，它输出`<table>`、`<row>`、`<col>`这样的XML格式。

```js
const { jsonToTable } = require('nested-json-to-table')

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

<a name="函数列表"></a>

# 1\. 函数列表

<a name="jsontohtml"></a>

## 1.1\. jsonToHTML

    function jsonToTable(data)

将data转化为HTML表格源码。

    function jsonToTable(meta, data)

将data转化为HTML表格源码，其中表头的部分通过meta定义。

    function jsonToTable(meta, data, rootAttrs)

将data转化为HTML表格源码，其中表头的部分通过meta定义。该调用可以附加一个根元素（即table）的属性列表。如下调用，最终生成的源码会是：

    jsonToTable(meta, data, { class: 'class1 class2' })

    // generate
    // <table class="class1 class2">
    //   ...

<a name="jsontotable"></a>

## 1.2\. jsonToTable

    function jsonToTable(data, builder)

利用自定义Builder，将data转化为table格式。关于自定义Builder的部分，可参考相关章节。

    function jsonToTable(meta, data, builder)

利用自定义Builder，将data转化为table格式。其中表头的部分通过meta定义。关于meta和自定义Builder的部分，可参考相关章节。

<a name="依赖"></a>

## 1.3\. 依赖

<a name="node版本"></a>

### 1.3.1\. Node版本

v8.11.1

<a name="生成文档"></a>

### 1.3.2\. 生成文档

    pip install MarkdownPP

<a name="license"></a>

## 1.4\. License

LGPL-2.1
