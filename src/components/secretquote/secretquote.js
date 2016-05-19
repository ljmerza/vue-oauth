import auth from '../../auth'

export default {
  data() {
    return {
      quote: ''
    }
  },
  methods: {
    getQuote() {
      this.$http
      .get('http://localhost:3001/api/protected/random-quote', (data) => {
        this.quote = data
      }, {
        //attach jwt header
        headers: auth.getAuthHeader()
      })
      .error((err) => console.log(err))
    }
  },
  route: {
    // hook to check user auth status before allowing nav to route
    canActivate() {
      return auth.user.authenticated
    }
  }
}
