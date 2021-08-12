# fillData 函数

## 函数定义

```javascript
function fillData(data, schema, matrixView)
```

该函数把 `data` 按照 `schema` 规定的模式**充满**到 `matrixView` 中去。`schemaObject` 是以下类型的对象或对象数组：

- `{ title: 'A', path: 'a' }`
- `{ title: 'A', path: 'nested.a' }`
- `{ title: 'Nested', path: 'nested', props: [ ... ] }`

## 数据兼容性

由于客户数据是千差万别甚至是不规范的，所以“兼容性”是这个函数优先考虑的问题。

首先，我们声明，该函数不检查 `matrixView` 是否越界的问题。

兼容的考虑是对数据的高度容忍度。哪怕数据有些不规范，我们仍然希望数据能够合理地填充进去。`schema` 的基本格式是 `{ title: 'title', path: 'key' }`，从这里处罚，涵盖兼容性考虑主要有：

1. `path` 取不到数据或取到的数据是 `undefined`。例子：

    - `object = null, path = 'a'`：对 `null` 或 `undefined` 使用属性提取。
    - `object = { b: 1, c: 2 }, path = 'a'`：不存在属性 `a`，提取的属性值是 `undefined`.
    - `object = { b: 1, c: 2 }, path = 'a.a1'`：由于不存在属性 `a`，连续提取属性会出错。

2. `object` 既可能是对象，也可能是数组。

针对兼容性问题 1，我们统一处理的策略是：只要 `schema` 定义规定有，就一定有至少一组数据填充，并且填充占位的内容是 `undefined`. 这意味着，`null`、`undefined`、基本类型值（如 `1`、`"x"`）、空对象 `{}`、空数组 `[]` 等都能得到单行空白填充。

针对兼容性问题 2，我们统一处理的策略是：统一作为数组对待，对象作为仅含一个元素的数组特例处理。

## 填充策略

填充时采用均分用尽的策略。所谓均分，是每个数据占用的行数一致；所谓用尽，是尽可能将行数占满。例如，现有两数据、八行，其占用行数情况是：

- 数据一：占用三行
- 数据二：占用三行
- 剩余两行，合并单元格为一个空白整体
