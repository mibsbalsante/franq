const zero = num => (num <= 9 ? "0" + num : num)

export const formatFullDate = dt => {
  const date = new Date(dt)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${zero(month)}/${zero(day)}/${zero(year)} ${zero(hours)}:${zero(
    minutes
  )}`
}

export const formatCurrency = (val, format = "BRL") => {
  const formats = {
    BRL: () => `R$ ${val.toFixed(2).replace(/\./, ",")}`,
    USD: () => `$${val.toFixed(2)}`,
  }
  return val ? formats[format]() : ""
}
