import axios from 'axios'

const instance = axios.create()

// Some available config options for making requests.
const configurations = {
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: '/api',

  useAccessToken: true,
  getAccessToken() {
    return window.localStorage.getItem('access_token')
  },
}

instance.defaults.baseURL = configurations.baseURL

instance.interceptors.request.use(
  config => {
    if (configurations.useAccessToken) {
      const accessToken = configurations.getAccessToken()

      if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken
      } else {
        console.warn('[Request middleware] No access token is found.')
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
  },
  err => {
    // Error handler for 401.
    if (err.response.status === 401) {
      console.error('Status 401')
    }

    err.response.data.status = err.response.status

    return Promise.reject(err.response.data)
  }
)

export default instance
