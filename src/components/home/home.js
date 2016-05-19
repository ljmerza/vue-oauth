export default {
  data() {
    return {
      quote: ''
    }
  },
  methods: {
    getQuote() {
      this.$http.get('http://localhost:3001/api/random-quote')
      .then((data) => {
        this.quote = data.data
      })
      .catch((err) => console.log(err))
    }
  }
}
