# json-to-table

> 一个将 JSON 数据转化为表格形式的工具，支持深层次的嵌套。

## 快速上手

[未发布]

如下可以生成 HTML 的表格源码：

```javascript
const { jsonToHTMLTable } = require('json-to-table')

const data = [
  {
    name: 'Jim',
    age: 18,
    courses: [
      {
        title: 'English',
        score: 87
      },
      {
        title: 'Chinese',
        score: 67
      }
    ]
  },
  {
    name: 'Lucy',
    age: 17,
    courses: [
      {
        title: 'Math',
        score: 97
      },
      {
        title: 'Music',
        score: 77
      },
      {
        title: 'Gym',
        score: 57
      }
    ]
  }
]

const tableHTML = jsonToHTMLTable(data)
```

生成的表格渲染如下：

<table>
  <thead>
    <tr>
      <th rowspan="2">name</th>
      <th rowspan="2">age</th>
      <th colspan="2">courses</th>
    </tr>
    <tr>
      <th>title</th>
      <th>score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Jim</td>
      <td rowspan="2">18</td>
      <td>English</td>
      <td>87</td>
    </tr>
    <tr>
      <td>Chinese</td>
      <td>67</td>
    </tr>
    <tr>
      <td rowspan="3">Lucy</td>
      <td rowspan="3">17</td>
      <td>Math</td>
      <td>97</td>
    </tr>
    <tr>
      <td>Music</td>
      <td>77</td>
    </tr>
    <tr>
      <td>Gym</td>
      <td>57</td>
    </tr>
  </tbody>
</table>

## 概念

### Props

`json-to-table` 将普通的 JavaScript 数组渲染成表格数据，表格的头可以通过一个 `props` 的概念声明。最简单的声明 props 的示例大致如下：

```javascript
const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
const data = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
const tableHTML = jsonToHTMLTable(data, props)
```

以上即指定表头为`a`、`b`、`c`. 建议始终指定表头，否则表头将从`data`中提取，而提取的结果往往不符合预期。

#### 仅声明感兴趣的部分

声明 props 的第一个用途，是仅仅声明我们需要的字段。例如

```javascript
const props = [ { key: 'a' }, { key: 'b' } ]
const data = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
const tableHTML = jsonToHTMLTable(data, props)
```

仅仅只会拿字段`a`、`b`做表格。

#### 重排顺序

声明 props 的第二个用途，是重排表格中列的顺序：

```javascript
const props = [ { key: 'b' }, { key: 'c' }, { key: 'a' } ]
const data = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
const tableHTML = jsonToHTMLTable(data, props)
```

现在表格列从左到右的顺序分别是：`b`、`c`、`a`.

#### 内部 props 声明

对于嵌套的数据，可以声明内部的 props：

```javascript
const props = [
  { key: 'a' },
  { 
    key: 'b', 
    props: [ { key: 'c' }, { key: 'd' } ]
  },
  { key: 'e' }
]
const data = [
  { a: 1, b: { c: 2, d: 3 }, e: 4 },
  { a: 5, b: { c: 6, d: 7 }, e: 8 }
]
const tableHTML = jsonToHTMLTable(data, props)
```

## API

### jsonToHTMLTable

```javascript
jsonToHTMLTable(data, [props], [options])
```

options 详解：

- `format`: 生成的格式，`dom` 表示生成 HTML Table 元素， `source` 表示生成字符串。
            默认根据环境判定，node 环境下默认值为 `source`，浏览器环境下默认值为 `dom`.
- `writeTo`: 如果是一个字符串，则写入到本地文件；否则，写入到一个流。

返回：

- 如果`options`参数省略，则会返回 HTML 表格。根据系统所在环境，如果是 Node 环境，返回 HTML 源码；如果是浏览器环境，返回 Dom 节点。
- 如果指定`options.writeTo`，将会 HTML 源码写入到一个流，函数返回 undefined.

### jsonToExcel

```javascript
jsonToExcel(data, [props], [toPath])
```

生成 Excel 格式的表格，并写入到`toPath`指定的路径。如果`toPath`省略，则返回 Buffer.

## 扩展

在完成 v1 之前，事实上存在一个 v0 版，v0 版采用了生命周期函数的方式。鉴于该方式理解起来较为复杂，所以 v1 版摒弃了该方式。

v1 的方式称之为 Context. 库提供一个 Context，扩展者使用 Context 实现自己的自由扩展。Context 提供生成 cells 的方法。虽然说样板代码更多了，但理解起来更为简单。

```javascript
const { Context } = require('json-to-table')

function jsonToCustomize (data, props) {
  const context = new Context()

  if (props) {
    context.initProps(props)
  } else {
    context.initPropsFromData(array.slice(0, 10))
  }

  const headCells = context.generateHeadCells(props)
  // 用你自己的方式处理 headCells

  for (const item of data) {
    const dataCells = context.generateDataCells(item)
    // 用你自己的方式处理这一条数据 dataCells
  }
}
```

`Cells`: 一个数组，其中每个元素代表表格中的单元格。字段列举如下：

- `r`: 单元格所在的行序号
- `c`: 单元格所在的行序号
- `rs`: 单元格纵跨的行数
- `cs`: 单元格横跨的列数
- `v`: 该单元格的内容

## 备忘

### 做都没做

- [x] title
- [x] 简写
- [ ] 顺序

### Unresolved Tips

- [ ] 如何让 ava 仅仅显示错误的测试名（很有用）
- [ ] XLSX 貌似不支持 stream
