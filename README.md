# json-to-table

> 一个将 JSON 数据转化为表格形式的工具，支持深层次的嵌套。

## 快速上手

你可以使用 npm 或 yarn 安装

    npm install json-to-table
    yarn add json-to-table

你可以像下面这样调用

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

const html = jsonToHTMLTable(data)
```

## 备忘

### jsonToHTMLTable 是如何实现的

不像前一版那样，提供一个固有的模式供用户填充钩子函数。这一版的扩展只提供基本的工具，包括遍历原数据、将 props 转化成 cells、将 data 转化成 cells 在内的所有调用，都需要用户自主去完成。不过，系统提供了 Context 工具，它包含了转化为 cells 的底层调用。

### Unresolved Tips

- [ ] 如何让 ava 仅仅显示错误的测试名
- [ ] XLSX 貌似不支持 stream
