import axios from 'axios'

import { API_BASE_INDIVIDUAL_URL, API_BASE_URL, API_USER_URL, IS_DEV } from '~/utils/config'
import { useToken } from '~/composables/useToken'

const { getToken, gotoLogin } = useToken()

export const $individual = axios.create({
  baseURL: API_BASE_INDIVIDUAL_URL,
})

export const $http = axios.create({
  baseURL: API_BASE_URL,
})

$individual.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      if (!IS_DEV)
        gotoLogin()
    }
    else if (error.response.status === 403) {
      // window.location.href = '/forbidden'
    }
    return Promise.reject(error)
  },
)
$individual.interceptors.request.use((config) => {
  const token = getToken()
  if (token)
    config.headers.act = encodeURIComponent(token)
  config.withCredentials = true
  return config
})

$http.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      if (!IS_DEV)
        gotoLogin()
    }
    else if (error.response.status === 403) {
      window.location.href = '/forbidden'
    }
    return Promise.reject(error)
  },
)
$http.interceptors.request.use((config) => {
  const token = getToken()
  if (token)
    config.headers.act = encodeURIComponent(token)
  config.withCredentials = true
  return config
})

export const $httpUser = axios.create({
  baseURL: API_USER_URL,
})
$httpUser.interceptors.request.use((config) => {
  const token = getToken()
  if (token)
    config.headers.act = encodeURIComponent(token)
  config.withCredentials = true

  return config
})
