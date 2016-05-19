import {router} from '../index'

if (window) {
  var localStorage = {
    setItem () {},
    getItem () {},
    removeItem () {}
  }
}

// url and endpoint constants
const API_URL = 'http://localhost:3001/'
const LOGIN_URL = API_URL + 'sessions/create/'
const SIGNUP_URL = API_URL + 'users/'

export default {
  // user object will let us check authentication status
  user: {
    authenticated: false
  },
  // send request to login url and save returned jwt
  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds)
    .then((data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      // redirect to a specific router
      if (redirect) {
        router.go(redirect)
      }
    })
    .catch((err) => {
      context.error = err.data
    })
  },

  // same code as above only do a POST request on signup url
  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds)
    .then((data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    })
    .catch((err) => {
      context.error = err.data
    })
  },

  // to logout,only need to remove token and set auth boolean to false
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  // if jwt exists then set auth boolean to true otherwise false
  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // object that is passed as header for authentication requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer' + localStorage.getItem('id_token')
    }
  }
}
