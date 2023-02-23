export const formatFullDate = dt => {
  const date = new Date(dt)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${month}/${day}/${year} ${hours}:${minutes}`
}

export const formatCurrency = (val, format = "BRL") => {
  const formats = {
    BRL: () => `R$ ${val.toFixed(2).replace(/\./, ",")}`,
    USD: () => `$${val.toFixed(2)}`,
  }
  return val ? formats[format]() : ""
}
