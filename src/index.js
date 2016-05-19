// file used to setup main imports and configs such as routing

import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import SecretQuote from './components/SecretQuote.vue'
import Signup from './components/SignUp.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

// check if user has jwt auth when first starting page
import auth from './auth'
//set a global auth header instead of setting at each http request
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
auth.checkAuth()

export var router = new VueRouter()

// setup all routes and match routes to components
router.map({
  '/home': {component: Home},
  '/secretQuote': {component: SecretQuote},
  '/login': {component: Login},
  '/signup': {component: Signup}
})

// redirect all other routes to home page
router.redirect({
  '*': '/home'
})

// start app on the app element
router.start(App, 'app')
