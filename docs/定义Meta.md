## 定义Meta

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
