# CHANGE LOGS

## 版本 0.1.6

1. 调整 fillData 实现机制

    本次主要是为了修复 ISSUE 30，并且为了不重复计算 data 占用空间，调整了 fillData 的实现机制。先将其转化为中间格式，再将其填充到数组中。其中中间格式包括 Table、Row、Cell.

    为了兼容 Table、Row、Cell 的格式输出，fillData 对空数组的填充机制调整为与空对象一致。

2. 打包格式调整为 ES5

3. 重新设计缺席引入 XLSX 的报错方案
