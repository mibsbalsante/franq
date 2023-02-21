const storageType = useSession =>
  useSession ? "sessionStorage" : "localStorage"

export const saveToStorage = (key, list, useSession = false) =>
  window[storageType(useSession)].setItem(key, JSON.stringify(list))

export const getFromStorage = (key, useSession = false) =>
  JSON.parse(window[storageType(useSession)].getItem(key)) || {}

export const deleteFromStorage = (key, useSession = false) =>
  window[storageType(useSession)].removeItem(key)
