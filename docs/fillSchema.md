# fillSchema 函数

## 函数定义

```javascript
function fillSchema(schemaObject, matrixView)
```

该函数把 `schemaObject` 规定的模式**充满**到 `matrixView` 中去。`schemaObject` 是以下类型的对象或对象数组：

- `{ title: 'A', path: 'a' }`
- `{ title: 'A', path: 'nested.a' }`
- `{ title: 'Nested', path: 'nested', props: [ ... ] }`

## 填充策略

填充时采用保证用尽，尽量均分的策略。例如，现有 schema 对象为 `{ title: 'A', props: [ { title: 'B', title: 'C' } ] }`，它想要占满三行，则占用情况为：

- `A`：占两行
- `B`、`C`：占一行
