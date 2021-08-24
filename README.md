# json5-to-table

> 最好用的 JSON 数据转化为表格结构的工具之一。

经过一系列的打磨之后，可以说 `json5-to-table` 是目前最方便的将 JSON 数据转化为表格的工具之一。 它支持：

- 嵌套的 JSON 数据，包括任意深层次的数组、对象等。
- 内建支持生成 HTML、Excel 格式。
- 可定制表头。
- 方便扩展，使用原生的 `generateTable` 函数可辅助生成任意格式。
- 提供一个命令行工具可用于跨语言的开发。

## 安装

推荐使用 Yarn 或 NPM 安装：

```bash
// With Yarn
$ yarn add json5-to-table

// Or with NPM
$ npm install json5-to-table
```

亦可全局安装为了使用命令行工具：

```bash
// Global install with Yarn
$ yarn global add json5-to-table

// Or global install with NPM
$ npm install --global json5-to-table
```

也可以在浏览器内添加一个 script 标签（请替换 0.1.x 为正确的版本，发布的版本可在 [Releases](https://github.com/yetrun/json5-to-table/releases) 中查看）：

```html
<script lang="javascript" src="https://github.com/yetrun/json5-to-table/releases/download/0.1.x/json5-to-table.js"></script>
```

默认支持生成 HTML 格式。如果需要生成 Excel 格式，需同时安装依赖包：

```bash
$ yarn add xlsx
```

## 使用

### 引入函数并调用

如果是通过 Yarn 或 NPM 安装，使用 CommonJS 或 ES6 语法引入函数，例如

```javascript
import {
  generateTable,
  generateHTMLTable,
  generateExcel,
  parseDataToSchema
} from 'json5-to-table'
```

如果是在浏览器中使用，使用全局变量 `JSON5_TO_TABLE`：

```javascript
const {
  generateTable,
  generateHTMLTable,
  generateExcel,
  parseDataToSchema
} = JSON5_TO_TABLE
```

然后调用函数生成表格结构，例如以下是生成 HTML 格式的表格：

```javascript
const data = [
  {
    name: 'Jim',
    age: 18,
    courses: [
      { name: 'Music', duration: '3 hours' },
      { name: 'Basketball', duration: '2 hours' }
    ]
  },
  {
    name: 'Lucy',
    age: 17,
    courses: [
      { name: 'Music', duration: '2 hours' },
      { name: 'Painting', duration: '2 hours and 30 minutes' },
      { name: 'Yoga', duration: '1 hour and 40 minutes' }
    ]
  }
]

const schema = [
  { title: 'Name', path: 'name' },
  { title: 'Age', path: 'age' },
  { title: 'Courses', path: 'courses', props: [
    { title: 'Course Name', path: 'name' },
    { title: 'Learning Duration', path: 'duration' }
  ] }
]

generateHTMLTable(data, schema)
```

如此生成的表格的样子如下：

<table>
  <thead>
    <tr>
      <th rowSpan="2">Name</th>
      <th rowSpan="2">Age</th>
      <th colSpan="2">Courses</th>
    </tr>
    <tr>
      <th>Course Name</th>
      <th>Learning Duration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="2">Jim</td>
      <td rowSpan="2">18</td>
      <td>Music</td>
      <td>3 hours</td>
    </tr>
    <tr>
      <td>Basketball</td>
      <td>2 hours</td>
    </tr>
    <tr>
      <td rowSpan="3">Lucy</td>
      <td rowSpan="3">17</td>
      <td>Music</td>
      <td>2 hours</td>
    </tr>
    <tr>
      <td>Painting</td>
      <td>2 hours and 30 minutes</td>
    </tr>
    <tr>
      <td>Yoga</td>
      <td>1 hour and 40 minutes</td>
    </tr>
  </tbody>
</table>
### 使用命令行工具

全局安装包以后，即可使用命令行工具 `json5-to-table`. 其用法如下：

```bash
// 查看帮助文档
$ json5-to-table -h

// 生成 HTML 格式的表格，表格输出到控制台
$ json5-to-table -d <data-file> -e <schema-file> -p <options-file>

// 生成 Excel 格式的表格，表格输出到控制台
$ json5-to-table -d <data-file> --excel
```

**使用场景**

1. 可作为工具使用，通过命令行的方式生成 HTML 或 Excel 表格。
2. 其支持管道，可接入到其他语言。

**特别说明**

1. 文件支持 JSON5 格式。

2. `<data-file>` 支持 All In One 格式。当不指定 `<schema-file>` 和 `<options-file>` 时，且 `<data-file>` 的内容是以下结构，则从 `<data-file>` 中获得 `data`、`schema`、`options`：

   ```javascript
   // <data-file> 内容
   {
     "data": [
       // ...
     ],
     "schema": [
       // ...
     ],
     "options": {
       // ...
     }
   }
   ```

3. 当 `<data-file>` 参数未指定时，从标准输入中读取内容。

## 定制表头结构

### Schema 的作用

#### 定制表头字段

现有一段数据：

```javascript
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 }
]
```

我希望只对字段 `a`、`b` 生成表格，过滤调字段 `c`，这时可以用 Schema. Schema 的定义如下：

```javascript
const schema = [
  { path: 'a' },
  { path: 'b' }
]
```

此时再调用 `generateHTMLTable(data, schema)`，生成的表头将如下：

<table>
  <tr>
    <th>a</th>
    <th>b</th>
  </tr>
</table>


#### `title`：定制表头文本

同样是以上的数据，我们希望以大写的 A 和 B 来显示表头，可通过配置 `title` 选项来实现：

```javascript
const schema = [
  { title: 'A', path: 'a' },
  { title: 'B', path: 'b' }
]
```

除了常规的文本之外，`title` 还有以下两种特殊用法：

1. 当 `title` 未给出时，文本由 `path` 导出。例如 `{ path: 'a' }` 和 `{ title: 'a', path: 'a' }` 等价。
2. 当 `title` 等于空白字符串时， 但表头不占用行单元格。 借助这个特性，可实现标量数组的分行显示。具体可参见[将长文本数组分行显示](#将长文本数组分行显示)。

#### `path`：定制列的属性提取路径

`path` 用于定制该列提取数据的路径，它其实支持多种用法，列举如下：

- `''`：提取完整的数据。
- `'a'`：提取字段 `a`.
- `'a.b.c'`：依次提取字段 `a`、`b` 、`c`，中间能很好地处理数组。

#### `props`：定制嵌套属性

如果数据含有深层嵌套，这时可通过 `props` 选项定制深层的 `schema`. 一个示例如下：

```javascript
const data = [
  { a: 1, b: { c: 2, d: 3 }},
  { a: 4, b: { c: 5, d: 6 }}
]
```

```javascript
const schema = [
  { path: 'a' },
  { path: 'b', props: [
    { path: 'c' },
    { path: 'd' }
  ] }
]
```

此时再调用 `generateHTMLTable(data, schema)`，表头将展现嵌套格式：

<table>
  <tr>
    <th rowSpan="2">a</th>
    <th colSpan="2">b</th>
  </tr>
  <tr>
    <th>c</th>
    <th>d</th>
  </tr>
</table>

#### 对数组的处理

在生成表格时，数组和对象不区分对待，对象可以看作含有当个元素的数组。为了理解如此，现举几个例子加以说明。

对于下面两个数据，它们生成的表格结构是一样的：

```javascript
const data1 = { a: 1, b: 2, c: 3 }

const data2 = [
  { a: 1, b: 2, c: 3 }
]
```

即使内部字段是数组，它们的生成格式保持一致：

```javascript
const data1 = [
  { a: 1, b: { c: 2, d: 3 } }
]

const data2 = [
  { a: 1, b: [
    { c: 2, d: 3 }
  ]}
]
```

下面用例子说明数组如何显示。首先给定内部含有两个元素的数组（字段 `b`）：

```JavaScript
const data = [
  { a: 1, b: [
    { c: 2, d: 3 },
    { c: 4, d: 5 }
  ]}
]
```

给定 Schema：

```javascript
const schema = [
  { path: 'a' },
  { path: 'b', props: [
    { path: 'c' },
    { path: 'd' }
  ]}
]
```

生成的完整表格显示为：

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
      <td rowSpan="2">1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
    </tr>
  </tbody>
</table>


### 数据推导表头

#### 推导方式

任何生成表格结构的函数，包括 `generateTable`、`generateHTMLTable`、`generateExcel` 都包含两种用法：

1. 显示指定 Schema，例如：
   ```javascript
   generateHTMLTable(data, schema)
   ```

2. 隐式推导 Schema，例如：
   ```javascript
   generateHTMLTable(data, null, { parseDataToSchema: 'stack' })
   ```

这里讲一下两种推导的方式：`stack` 和 `flatten`. 他们的区别在于如何处理嵌套表头。给出一条带嵌套的数据：

```javascript
const data = [
  {
    a: 1,
    b: {
      c: 2, d: 3
    }
  }
]
```

使用 `stack` 生成的表头是：

```javascript
generateHTMLTable(data, null, { parseDataToSchema: 'stack' })
```

<table>
  <tr>
    <th rowSpan="2">a</th>
    <th colSpan="2">b</th>
  </tr>
  <tr>
    <th>d</th>
  </tr>
</table>


使用 `flatten` 生成的表头是：

```javascript
generateHTMLTable(data, null, { parseDataToSchema: 'stack' })
```

<table>
  <tr>
    <th>a</th>
    <th>b.c</th>
    <th>b.d</th>
  </tr>
</table>


默认使用的策略是 `stack`，也就是说

```JavaScript
generateHTMLTable(data)
```

等效于

```javascript
generateHTMLTable(data, null, { parseDataToSchema: 'stack' })
```

#### 推导问题

虽然可以使用隐式推导，但我这里还是不推荐使用，最主要的原因是无法保证列的顺序。例如对于以下数据：

```javascript
const data = [
  { a: 1, b: 2, c: 3 },
  { c: 4, b: 5, a: 6 }
]
```

无法保证列一定按照 `a`、`b`、`c` 的顺序排列。 一方面依赖于浏览器的实现， 另一方面推导算法也不做任何保证。

因此一律推荐在任何时候显示地指定 Schema. 如果你对 Schema 不够了解，可通过 `parseDataToSchema` 函数先导出 Schema，再调整成自身需要的样子。详细技巧可参见[使用 parseDataToSchema 了解 Schema 的用法](#使用-parsedatatoschema-了解-schema-的用法)。

## API

### `generateTable`

**定义**

```javascript
generateTable(data, schema, options)
```

**描述**

该函数生成的表格格式以 JS 对象表示，其主要作用是提供一种方便的中间格式，以便转化为其他格式。实质上，`generateHTMLTable` 和 `generateExcel` 都是基于该函数快速开发出来的。

**参数解释**

- `data`：任意 JavaScript 数据，包括数组、对象、数字、字符串、Null、Undefined 等。
- `schema`：定制表头结构，其用法在前文有详细讲解。
- `options`：选项对象，当前仅支持一个选项：
  - `parseSchemaToData`：`"stack"` 或 `"flatten"`.

**示例**

```
const data = [
  {
    a: 1,
    b: [
      { c: 2, d: 3 }
    ]
  },
  {
    a: 4,
    b: [
      { c: 5, d: 6 },
      { c: 7, d: 8 }
    ]
  }
]

const schema = [
  { path: 'a' },
  { path: 'b', props: [
    { path: 'c' },
    { path: 'd' }
  ] }
]

generateTable(data, schema)
```

显示输出为：

```javascript
{
  header: [
    [
      { row: 1, col: 1, val: 'a', rowSpan: 2, colSpan: 1 },
      { row: 1, col: 2, val: 'b', rowSpan: 1, colSpan: 2 },
      undefined
    ],
    [
      undefined,
      { row: 2, col: 2, val: 'c', rowSpan: 1, colSpan: 1 },
      { row: 2, col: 3, val: 'd', rowSpan: 1, colSpan: 1 }
    ]
  ],
  body: [
    [
      { row: 3, col: 1, val: 1, rowSpan: 1, colSpan: 1 },
      { row: 3, col: 2, val: 2, rowSpan: 1, colSpan: 1 },
      { row: 3, col: 3, val: 3, rowSpan: 1, colSpan: 1 }
    ],
    [
      { row: 4, col: 1, val: 4, rowSpan: 2, colSpan: 1 },
      { row: 4, col: 2, val: 5, rowSpan: 1, colSpan: 1 },
      { row: 4, col: 3, val: 6, rowSpan: 1, colSpan: 1 }
    ],
    [
      undefined,
      { row: 5, col: 2, val: 7, rowSpan: 1, colSpan: 1 },
      { row: 5, col: 3, val: 8, rowSpan: 1, colSpan: 1 }
    ]
  ]
}
```

### `generateHTMLTable`

**定义**

```javascript
generateHTMLTable(data, schema, options)
```

**作用**

生成 HTML 表格源码，返回的格式是字符串。生成的 HTML 表格用到的标签包括 `<table>`、`<thead>`、`<tbody>`、`<tr>`、`<th>`、`<td>`，可为标签定制属性，包括 `class`、`style` 及其他。

**参数解释**

- `data` 和 `schema`：同 `generateTable`.
- `options`：选项对象，除了支持 `generateTable` 的选项之外，还支持下列选项：
  - `attributes`： 声明标签用到的属性，具体用法看示例。

**示例**

```javascript
// 添加标签属性
generateHTMLTable(data, schema, {
  attributes: {
    table: { class: 'c-table' }, 
    thead: { class: 'c-table-header' }, 
    tbody: { class: 'c-table-body' },
    tr: { class: 'c-table-row' },
    'thead.tr': { style: 'background: light-blue' },
    'tbody.tr': { style: 'background: cyan' },
    th: { class: 'c-header-cell' },
    td: { class: 'c-data-cell' }
  }
})
```

### `generateExcel`

**备注**

需同时安装依赖包 `xlsx`.

**定义**

```javascript
generateExcel(data, schema, options)
```

**作用**

生成 Excel 表格。

**参数解释**

- `data` 和 `schema`：同 `generateTable`.
- `options`：选项对象，除了支持 `generateTable` 的选项之外，还支持下列选项：
  - `writeTo`： 一个文件路径。

**示例**

```javascript
// 写入到文件路径
generateExcel(data, schema, { writeTo: '/tmp/example.xlsx' })

// 写入到标准输出
generateExcel(data, schema, { writeTo: '/dev/stdout' })
```

### `parseDataToSchema`

**定义**

```javascript
parseDataToSchema(data, mode)
```

**作用**

通过数据推导出 Schema，支持两种推导方式。

**参数解释**

- `data`：数据
- `mode`：推导方式，支持两种推导方式 `"stack"`  和 `"flatten"`. 其详细区别可参考**数据推导表格**部分。

## 使用技巧

#### 显示标量数组

虽然很少见， 但如果我们遇到下面的数组数据：

```javascript
const data = ['A', 'B', 'C']
```

默认情况下显示在一个格子里：

<table>
  <tbody>
    <tr>
      <td>A,B,C</td>
    </tr>
  </tbody>
</table>

我们希望对他分行显示，这时可通过定制空白的 `path` 满足目的：

```javascript
const schema = { title: 'Data', path: '' }
```

显示效果将是：

<table>
  <thead>
    <tr>
      <th>Data</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A</td>
    </tr>
    <tr>
      <td>B</td>
    </tr>
    <tr>
      <td>C</td>
    </tr>
  </tbody>
</table>

#### 将长文本数组分行显示

数组在单元格中显示文本使用的是 `array.toString()` 方法，`[1, 2, 3]` 的显示效果是 `1,2,3`. 如果遇到长文本数组，例如：

```javascript
const data = {
  short: 1,
  long: [
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
    "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"
  ]
}
```

默认的显示方式将不够好。这时可通过定制 Schema 来实现数组的分行显示：

```javascript
const schema = [
  { path: 'short' },
  { path: 'long', props: [
    { title: '', path: '' }
  ]}
]
```

显示效果将如下：

<table>
  <thead>
    <tr>
      <th>short</th>
      <th>long</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3">1</td>
      <td>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</td>
    </tr>
    <tr>
      <td>BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB</td>
    </tr>
    <tr>
      <td>CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC</td>
    </tr>
  </tbody>
</table>

**解释**

这里用到 `title` 和 `path` 的特殊用法。空字符串的 `title` 不占用表头的格子，空字符串的 `path` 提取完整数据。由于数据是数组，所以改为提取数组内的完整数据。

#### 使用 `parseDataToSchema` 了解 Schema 的用法

有些同学刚开始可能不知道 Schema 的用法，这时可通过 `parseDataToSchema` 推导出 Schema 并在控制台打印出来，打印出来的结果可调整以满足自己的需要。

```javascript
import { generateHTMLTable, parseDataToSchema } from '@yetrun/json-to-table'

const data = [
  // ...
]

// 查看 Schema
console.log(parseDataToSchema(data))

// 从控制台复制 Schema，并根据自己的需要调整
const schema = [
  // ...
]

// 显式应用 Schema 并生成表格
generateHTMLTable(data, schema)
```

## 贡献

可提交 PR 以改进本项目，亦可克隆源码进行二次开发。这里列出开发时常用到的命令：

```bash
# 运行单元测试
$ yarn test

# 构建和打包
$ yarn build
```

## License

