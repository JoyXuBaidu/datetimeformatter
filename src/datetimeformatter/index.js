let _Vue = null

const DateTimeFormatterPlugin = {
  install(Vue) {
    _Vue = Vue

    const that = this
    _Vue.mixin({
      filters: {
        dateTimeFilter(val, format) {
          if (!val) {
            return '-'
          }
          const date = that.initDate(String(val))
          return that.formatOutput(date, format)
        }
      },
      methods: {
        dateTimeFormatter(attr, format) {
          return (row) => {
            if (!row[attr]) {
              return '-'
            }
            const date = that.initDate(String(row[attr]))
            return that.formatOutput(date, format)
          }
        },
        dateTimeRangeFormatter(startAttr, endAttr, format, link) {
          return (row) => {
            if (!row[startAttr] || !row[endAttr]) {
              return '-'
            }
            const startDate = that.initDate(String(row[startAttr]))
            const endDate = that.initDate(String(row[endAttr]))
            return that.formatOutput(startDate, format) + (link ? link : '~') + that.formatOutput(endDate, format)
          }
        }
      }
    })
  },

  padStart(str) {
    return String(str).length < 2 ? String(str).padStart(2, '0') : String(str)
  },

  initDate(val) {
    return new Date(val.substring(0, 4), Number(val.substring(4, 6) - 1), val.substring(6, 8), val.substring(8, 10), val.substring(10, 12), val.substring(12, 14))
  },

  formatOutput(date, format) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return format.replace(/Y{2,4}|M{1,2}|D{1,2}|h{1,2}|H{1,2}|m{1,2}|s{1,2}/g,
      match => {
        switch (match) {
          case 'YY': return String(year).slice(-2)
          case 'YYYY': return String(year)
          case 'M': return String(month)
          case 'MM': return this.padStart(month)
          case 'D': return String(day)
          case 'DD': return this.padStart(day)
          case 'h': return String(hour)
          case 'hh': return this.padStart(hour)
          case 'H': return String(hour)
          case 'HH': return this.padStart(hour)
          case 'm': return String(minute)
          case 'mm': return this.padStart(minute)
          case 's': return String(second)
          case 'ss': return this.padStart(second)
          default: return String(match)
        }
      })
  }
}

export default DateTimeFormatterPlugin
