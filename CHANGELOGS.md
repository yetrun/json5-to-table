# CHANGE LOGS

## 版本 0.1.6-preview

- 添加中间格式：Table、Row、Cell
- fillData 实现调整：先将其转化为中间格式，再将其填充到数组中。
- fillData 实现调整引发对空数组处理的调整，以前合并所有单元格的行为调整为不合并单元格，其行为类似于空数组。
