# DatetimeFormatter Plugin

This is a plugin for formatting the pure datetime data from the backend like this: '20210518102420' to formatted date or datetime value which is supposed to be displayed on frontend. And also, it can show a formatted datetime range based on two pure datetime data and the format you set.

Three functions are mixined into Vue, one is a vue filter: ***dateTimeFilter***, two are formatter callback functions ***dateTimeFormatter*** and ***dateTimeRangeFormatter***, which are based on element-ui table *':formatter'* attribute.

Related links:  [filter(vue)](https://vuejs.org/v2/guide/filters.html)   [element-ui table](https://element.eleme.io/#/en-US/component/table)

## How to use
### init
npm i vue-datetime-formatter
```
// main.js

import DateTimeFormatterPlugin from 'vue-datetime-formatter'
Vue.use(DateTimeFormatterPlugin)

```

### dateTimeFilter
Pass the format template as input attribute and you will get related result.

Example：
```
// dateTimeResource='20210518102420'

<div>{{dateTimeResource | dateTimeFilter('YYYY/MM/DD')}}</div> // 2021/05/18
<div>{{dateTimeResource | dateTimeFilter('YYYY-MM-DD')}}</div> // 2021-05-18

<div>{{dateTimeResource | dateTimeFilter('YYYY/MM/DD HH:mm')}}</div> // 2021/05/18 10:24
<div>{{dateTimeResource | dateTimeFilter('YYYY/MM/DD HH:mm:ss')}}</div> // 2021/05/18 10:24:20

// dateTimeResource='20210508030505'

<div>{{dateTimeResource | dateTimeFilter('YY/MM/DD HH:mm:ss')}}</div> // 21/05/08 03:05:05
<div>{{dateTimeResource | dateTimeFilter('YY/M/D hh:mm:ss')}}</div> // 21/5/8 03:05:05
<div>{{dateTimeResource | dateTimeFilter('YY/M/D h:m:s')}}</div> // 21/5/8 3:5:5
```
### dateTimeFormatter & dateTimeRangeFormatter
These two formatters both based on element-ui table's formatter attribute.

For dateTimeFormatter, you can pass the _attribute name_ of the datetime source and _format_ as input to generate the formatted datetime.

For dateTimeRangeFormatter, you can pass the _attribute name_ of the 'start' datetime source and 'end' datetime source, _format_ and the _link_ string (optional, default is '~') you want to link the start and end datetime as input to generate the formatted datetime range.

Example:
```
/*
table data source:
tableData: [
  { startTime: '202101011324', endTime: '20210102142334' }
]
*/

<el-table :data="tableData" border>
      <el-table-column prop="startTime" :formatter="dateTimeFormatter('startTime', 'YYYY/MM/DD')" label="开始时间"></el-table-column> // 2021/01/01
      <el-table-column prop="endTime" :formatter="dateTimeFormatter('endTime', 'YYYY-MM-DD')" label="结束时间"></el-table-column> // 2021-01-02
      <el-table-column :formatter="dateTimeRangeFormatter('startTime','endTime', 'YYYY/MM/DD hh:mm:ss', ' - ')" label="时间范围"></el-table-column> // 2021/01/01 13:24:00 - 2021/01/02 14:23:34

</el-table>
```
result:
![formatter](https://user-images.githubusercontent.com/56863139/118585548-b6ea8900-b7cb-11eb-9243-968ab0e6dab0.png)

## Format Options
data source: '20210508030505'

| format     | Example | Describe |
| ----------- | ----------- | ---------- |
| YYYY      | 2021       | 4 characters year value |
| YY   | 21        | 2 characters year value |
| M   | 5        | month value |
| MM   | 05        | 2 characters month value |
| D   | 8        | date value |
| DD   | 08        | 2 characters date value |
| h   | 3        | hour value |
| hh   | 03        | 2 characters hour value |
| H   | 3        | hour value |
| HH   | 03        | 2 characters hour value |
| m   | 5        | minute value |
| mm   | 05       | 2 characters minute value |
| m   | 3        | second value |
| mm   | 03       | 2 characters second value |
