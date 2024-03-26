// export const IS_DEV = !!import.meta.env.VITE_IS_DEV

export const IS_DEV = !!import.meta.env.DEV

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
export const API_USER_URL = import.meta.env.VITE_API_USER_URL

export const API_FILE_URL = import.meta.env.VITE_API_FILE_URL

export const MARKET_URL = import.meta.env.VITE_MARKET_URL

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
export const IDENTITY_SERVICE = import.meta.env.VITE_IDENTITY_SERVICE
export const LOGOUT_URL = import.meta.env.VITE_LOGOUT_URL
export const COOKIE_HOST = import.meta.env.VITE_COOKIE_HOST
export const HEADER_DTM = import.meta.env.VITE_DTM_URL
export const HEADER_RKP = import.meta.env.VITE_RKP_URL
export const HEADER_MARKET = import.meta.env.VITE_MARKET_URL
export const HEADER_CABINET = import.meta.env.VITE_CABINET_URL
export const VITE_HEADER_DWM = import.meta.env.VITE_DWM_URL

export const VITE_API_IMG_URL = import.meta.env.VITE_API_IMG_URL
