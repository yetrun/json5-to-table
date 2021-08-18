# 关于 path 提取属性值的规律总结

## 数据

数据分三类，Object、Array、Nil. 其中基本数据类型如 Number、String 属于 Object，Null 和 Undefined 都属于 Nil.

在提取属性时，遇到对象则从对象中提取，遇到数组则从数组中元素提取。如果遇到 Null 或 Undefined，则提前终止提取，返回 undefined. 本库不区分 Object 和 Array，总把 Object 当作只含一个元素的数组对待。

## path

当从 object 生成表格时，path 规律如下：

- `''`: 空白 path 值提取完整对象 `object`；
- `'a'`：提取对象的属性 `object.a`；
- `'a.b.c'`：深层次递归提取对象的属性 `object.a.b.c`，能很好地处理数组。
