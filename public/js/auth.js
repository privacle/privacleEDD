const $ = require('jquery');

module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    loginRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}










function loginRequest(email, pass, cb) {

  var loginCreds = {
    email: email,
    password: pass
  }

  $.post('/guests/login', loginCreds)
    .done((data) => {
      console.log(data);
      cb({
        authenticated: true,
        token: data.token
        
      })
    })
    .error((error) => {
      console.log(error);
      cb({
        authenticated: false
        
      })
    })
}



  // setTimeout(() => {
  //   if (email === 'joe@example.com' && pass === 'password1') {
  //     cb({
  //       authenticated: true,
  //       token: Math.random().toString(36).substring(7)
  //     })
  //   } else {
  //     cb({ authenticated: false })
  //   }
  // }, 0)
