import type { CookieSetOptions } from 'universal-cookie'
import Cookies from 'universal-cookie'
import { IDENTITY_SERVICE, IS_DEV } from '~/utils/config'
export function useToken() {
  const cookies = new Cookies(null)
  const TOKEN_KEY = 'act'
  const setToken = (token: string, expires: number): string => {
    const options: CookieSetOptions = {
      path: '/',
    }
    if (!IS_DEV)
      options.domain = '.dthub.uz'

    if (expires)
      options.expires = new Date(expires)

    cookies.set(TOKEN_KEY, token, options)
    return token
  }
  const logout = () => {
    window.location.href = `${IDENTITY_SERVICE}`
  }

  const gotoLogin = () => {
    window.location.href = `${IDENTITY_SERVICE}`
  }

  const getToken = (): string | null => {
    return cookies.get(TOKEN_KEY) || null
  }

  const removeToken = () => {
    const options: Record<string, string> = {
      path: '/',
    }
    if (!IS_DEV)
      options.domain = '.dthub.uz'

    cookies.remove(TOKEN_KEY, options)
  }

  const handleLogout = () => {
    if (!IS_DEV)
      window.location.href = 'forbidden'
    else window.location.href = `${IDENTITY_SERVICE}`
  }

  return {
    handleLogout,
    setToken,
    getToken,
    removeToken,
    TOKEN_KEY,
    logout,
    gotoLogin,
  }
}
