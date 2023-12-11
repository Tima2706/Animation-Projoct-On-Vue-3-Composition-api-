
import Cookies from 'universal-cookie'
import { IS_DEV } from '~/utils/config'
export function useLanguage() {
  const cookies = new Cookies(null)

  const LANGUAGE_KEY = 'lang'

  const setLang = (lang:string): string => {
    const options: Record<string, string> = {
      path: '/',
    }
    if (!IS_DEV)
      options.domain = '.dt.uz'

    cookies.set(LANGUAGE_KEY, lang, options)
    return  lang
  }





  const getLang = () => {
    return cookies.get(LANGUAGE_KEY) || null
  }



  return {
    setLang,
    getLang
  }
}
