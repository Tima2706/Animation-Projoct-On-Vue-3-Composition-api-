
import Cookies from 'universal-cookie'
import {COOKIE_HOST, IS_DEV} from '~/utils/config'
export function useLanguage() {
  const cookies = new Cookies(null)

  const LANGUAGE_KEY = 'lang'
  const DEFAULT_LANG = 'ru'


  const setLang = (lang: string) => {
    const domain = IS_DEV ?  'localhost' : COOKIE_HOST
    cookies.set(LANGUAGE_KEY, lang, {
      domain,
    })
  }





  const getLang = () => {
    return cookies.get(LANGUAGE_KEY) || DEFAULT_LANG
  }



  return {
    setLang,
    getLang
  }
}
