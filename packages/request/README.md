# Request

[![](https://img.shields.io/badge/version-v0.1.2-brightgreen.svg)]()

> An opinionated [axios](https://github.com/axios/axios) wrapper with some interceptors.

### Few options

```
// Some available config options for making requests.
{
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: '/api',

  useAccessToken: true,
  getAccessToken() {
    return window.localStorage.getItem('access_token')
  },
}
```
