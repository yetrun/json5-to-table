> 本项目已迁移至[新地址](https://github.com/yetrun/json5-to-table)：
>
>     https://github.com/yetrun/json5-to-table
>
> 新的包 `json5-to-table` 支持更丰富、且更标准的模式定义，希望取得后续更新的朋友请移步[新地址](https://github.com/yetrun/json5-to-table)。 
> 
> 本项目之后将不再维护。旧版将继续提供使用，只是不再更新。
>
> **最后，诚挚希望之前 star 过我的朋友再 star 一遍新项目，非常感谢！**

=

=

=

=

# json-to-table

## 快速上手

### 渲染效果

如下生成 HTML 的表格源码：

```javascript
const { jsonToHTMLTable } = require('nested-json-to-table')
const data = [
  {
    name: 'Jim',
    age: 18,
    courses: [
      { title: 'English', score: 87 },
      { title: 'Chinese', score: 67 }
    ]
  },
  {
    name: 'Lucy',
    age: 17,
    courses: [
      { title: 'Math', score: 97 },
      { title: 'Music', score: 77 },
      { title: 'Gym', score: 57 }
    ]
  }
]
const tableHTML = jsonToHTMLTable(data)
```

渲染的表格如下：

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

### 安装

推荐使用 `npm` 或 `yarn` 安装：

```bash
npm install nested-json-to-table
```

或者使用打包好的文件：[Releases](https://github.com/run27017/json-to-table/releases)

```html
<script src="/path/to/json-to-table.min.js"></script>
<script>
const { jsonToHTMLTable } = JSONToTable
</script>
```

关于 WebPack 打包，需要处理 node 和 browser 环境。如果你是在浏览器环境，在 WebPack 的相关配置文件下加入：

```js
  externals: {
    fs: 'fs'
  }
```

## 概念

### Props

#### 仅声明感兴趣的部分

原始的`data`可能会混杂大量无关的字段，而我们想要生成表格时可能只需要其中的部分字段。怎么办呢？声明`props`就好了：

```javascript
const props = [ { key: 'a' }, { key: 'b' } ]
const data = [
  { a: 1, b: 2, c: 3, d: 4, e: 5 },
  { a: 6, b: 7, c: 8, d: 9, e: 10 }
]
const tableHTML = jsonToHTMLTable(data, props)
```

以上代码渲染表格时，仅仅只会提取字段`a`、`b`的内容。

#### 声明标题

声明`props`的另一个目的，是需要定义头部标题的显示文本。如下，如果不定义`title`部分，则显示的头列为`a | b |c`；定义`title`后，则头列显示为`A | B | C`.

```javascript
const props = [
  { key: 'a', title: 'A' },
  { key: 'b', title: 'B' },
  { key: 'c', title: 'C' }
]
const data = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
const tableHTML = jsonToHTMLTable(data, props)
```

#### 重排顺序

`props`的顺序极为表格列的排列顺序。如果不定义`props`，则排列顺序很难预测。

```javascript
const props = [ { key: 'b' }, { key: 'c' }, { key: 'a' } ]
const data = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }]
const tableHTML = jsonToHTMLTable(data, props)
```

#### 内部 props 声明

因为支持嵌套的表格渲染，所以可以定义内部的`props`:

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

#### 简单写法

如果你觉得有些写法过于繁琐，还有一种简单的写法。如下：

```javascript
const props = ['a', 'b', 'c']
```

等价于：

```javascript
const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
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
- `indent`: 缩进宽度，默认值为 2.

返回：

- 如果`options`参数省略，则会返回 HTML 表格。根据系统所在环境，如果是 Node 环境，返回 HTML 源码；如果是浏览器环境，返回 Dom 节点。
- 如果指定`options.writeTo`，将会 HTML 源码写入到一个流，函数返回 undefined.

### jsonToExcel

```javascript
jsonToExcel(data, [props], [toPath])
```

生成 Excel 格式的表格，并写入到`toPath`指定的路径；如果`toPath`省略，则返回表格的二进制内容。

该函数根据运行环境做出合适的响应。这意味着，指定`toPath`时，node 环境下写入到本地文件，浏览器环境下表现为下载文件；未指定`toPath`时，node 环境和浏览器环境返回相应的格式，它们都易于写入到本地文件或者构建一个 Blob 对象用于 HTML5 File API.


## 扩展

在完成 v1 之前，事实上存在一个 v0 版，v0 版采用了生命周期函数的方式。鉴于该方式理解起来较为复杂，所以 v1 版摒弃了该方式。

v1 的方式称之为 Context. 库提供一个 Context，扩展者使用 Context 实现自己的自由扩展。Context 提供生成 cells 的方法。虽然说样板代码更多了，但理解起来更为简单。

```javascript
const { Context } = require('nested-json-to-table')

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
- `stringValue`: `v` 的字符串表示。一般来说，写入到单元格的内容使用该属性。

# License

LGPL-2.1
