import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'
import { handleLogout } from '../../../redux/authentication'

// ** API Routes
import api from '../../../router/routes/api'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      response => response,
      error => {
        // ** const { config, response: { status } } = error
        const { response } = error
        // const originalRequest = config

        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              this.isAlreadyFetchingAccessToken = false

              // ** Update accessToken in localStorage
              this.setToken(r.data.access_token)
              this.setRefreshToken(r.data.refresh_token)

              this.onAccessTokenFetched(r.data.access_token)
            })
          } else {
            if (response.status === 403) {
              this.logout()
              handleLogout()
            }
          }
          // const retryOriginalRequest = new Promise(resolve => {
          //   this.addSubscriber(accessToken => {
          //     originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
          //     resolve(this.axios(originalRequest))
          //   })
          // })
          // console.log(retryOriginalRequest)
        } else {
          if (response.status === 403) {
            this.logout()
            handleLogout()
          }
        }
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getSanitizedToken() {
    const token = localStorage.getItem(this.jwtConfig.storageTokenKeyName).replace(/['"]+/g, '')
    return token
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  setUserData(value) {
    localStorage.setItem("userData", value)
  }

  logout() {
    localStorage.removeItem("userData")
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  logoutAll(...args) {
    return axios.post(`${api.endpoint + api.routes.auth.logoutAll}`, ...args)
  }

  logoutSingle(value) {
    const head = {
      Authorization: `Bearer ${value}` 
    }
    return axios.post(`${api.endpoint + api.routes.auth.logout}/${value}`, {}, { headers: head })
  }

  logoutToken() {
    return axios.post(`${api.endpoint + api.routes.auth.logout}/${localStorage.getItem("accessToken")}`)
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}
