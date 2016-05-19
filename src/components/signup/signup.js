import auth from '../../auth'

export default {
  data() {
    return {
      // initialize properties used in login
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      var credentials = {
        username: this.credentials.username,
        password: this. credentials.password
      }

      // use this component's context to properly use http call
      // pass credentials object and route redirect after finished authenticating
      auth.signup(this, credentials, 'secretquote')
    }
  }
}
