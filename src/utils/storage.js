export const saveToStorage = (key, list) =>
  window.localStorage.setItem(key, JSON.stringify(list))

export const getFromStorage = key =>
  JSON.parse(window.localStorage.getItem(key)) || {}

export const deleteFromStorage = key => window.localStorage.removeItem(key)
