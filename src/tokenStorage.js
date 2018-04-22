const LS_KEYS = {
  ACCESS_TOKEN: 'spotify_access_token',
  TOKEN_EXPIRES: 'spotify_token_expiry',
}

export const storeToken = (token, expiry = 3600) => {
  const expiryDate = new Date().getTime() + expiry * 1000
  localStorage.setItem(LS_KEYS.ACCESS_TOKEN, token)
  localStorage.setItem(LS_KEYS.TOKEN_EXPIRES, expiryDate)
}

export const getToken = () => {
  const token = localStorage.getItem(LS_KEYS.ACCESS_TOKEN)
  return token
}

export const checkToken = () => {
  const access_token = localStorage.getItem(LS_KEYS.ACCESS_TOKEN)
  const expiry = localStorage.getItem(LS_KEYS.TOKEN_EXPIRES)

  if (!access_token || !expiry) {
    return false
  }

  const timeNow = new Date().getTime()
  const expired = expiry - timeNow < 1000 * 60 * 5
  if (expired) {
    return false
  }

  return true
}

export const logout = () => {
  localStorage.removeItem(LS_KEYS.ACCESS_TOKEN)
  localStorage.removeItem(LS_KEYS.TOKEN_EXPIRES)
}