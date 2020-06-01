export const formatTime = date => {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const formatStatus = d => {
  d = Number(d)
  let str
  if (d === 0) str = '取消';
  if (d === 1) str = '报名中';
  if (d === 2) str = '开始';
  if (d === 3) str = '结束';
  return str
}