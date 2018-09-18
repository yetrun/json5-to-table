## 更多的JSON格式

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
