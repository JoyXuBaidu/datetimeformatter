# DatetimeFormatter Plugin

This is a plugin for formatting the pure datetime data from backend like this: '20210518102420' to formatted date or datetime value which is supposed to be displayed on frontend. And also, it can show a formatted datetime range based on two pure datetime data and the format you set.

Three functions are mixined into Vue, one is a vue filter: ***dateTimeFilter***, two are formatter callback functions ***dateTimeFormatter*** and ***dateTimeRangeFormatter***, which are based on element-ui table *':formatter'* attribute.

Related links:  [filter(vue)](https://vuejs.org/v2/guide/filters.html)   [element-ui table](https://element.eleme.io/#/en-US/component/table)

## How to use
### init
```

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
      <el-table-column prop="startTime" :formatter="dateTimeFormatter('startTime', 'YYYY/MM/DD')" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" :formatter="dateTimeFormatter('startTime', 'YYYY-MM-DD')" label="结束时间"></el-table-column>
      <el-table-column :formatter="dateTimeRangeFormatter('startTime','endTime', 'YYYY/MM/DD hh:mm:ss', ' ~ ')" label="时间范围"></el-table-column>
</el-table>
```
result:
![1](https://user-images.githubusercontent.com/56863139/118585126-da610400-b7ca-11eb-998c-a69d7bd03212.png)
