import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

declare global {
  type Module =
    | 'dwm'
    | 'rkp'
    | 'dtm'
    | 'info'
    | 'dtpos'
    | 'findoc'
    | 'apteka'
    | 'market'
    | 'cabinet'
  type Mode = 'dev' | 'prod' | 'preprod'
  type HeaderPosition = 'fixed' | 'absolute' | 'auto'

  interface Options {
    mode: Mode
    currentLang?: string
    activeModule: Module
    position: HeaderPosition
    enableProfileIcon?: boolean
    enableLanguageSwitcher?: boolean

    onClickProfileIcon?: () => void
    onSelectLanguage?: (lang: string) => void
  }
  var $loadDtHeader: (options: Options) => void
}

