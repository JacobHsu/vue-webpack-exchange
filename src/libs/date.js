import moment from 'moment'

export function toLocal24Time(data, format = 'YYYY/MM/DD HH:mm:ss') {
  if (!data) return ''

  return moment(data).format(format)
}

export const toLocalFullDateTime = datetime =>
  toLocal24Time(datetime, 'YYYY-MM-DD HH:mm:ss')
export const toLocalShortDateTime = datetime =>
  toLocal24Time(datetime, 'MM-DD HH:mm:ss')
export const toLocalMonthDay = datetime =>
  toMomentDate(datetime).format('MM/DD')
export const getTimeSecByTimestamp = timestamp =>
  parseInt(moment(timestamp * 1000).format('ss'), 10)

export function toLocalDate(data, format = 'YYYY-MM-DD') {
  if (!data) return ''
  return toMomentDate(data).format(format)
}

export function toMomentDate(data) {
  return moment(data)
}
