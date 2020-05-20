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
  let str
  switch (d) {
    case 0:
      str = '取消';
    case 1:
      str = '报名中';
    case 2:
      str = '开始';
    case 3:
      str = '结束';
  }
  console.log(str)

  return str
}