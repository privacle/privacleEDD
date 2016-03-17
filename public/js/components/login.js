const React = require('react');
const auth = require('../auth');

const Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState : function() {
    return {
      error: false
    }
  },
  handleSubmit : function(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
  },
  render : function() {
    return (
      <div>
        <div className="form">
          <aside className="card-panel">
            <form className="form-signin" onSubmit={this.handleSubmit}>
              <h2 className="form-signin-heading">Please Login</h2>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input ref="email" type="text" id="inputEmail" className="form-control"  placeholder="Email address" autofocus />

              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input ref="pass" name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" />

              <button type="submit" className="btn waves-effect waves-light light-blue darken-4" style={{display: 'inline', width: 150, marginTop: 0}}>Login</button>
            </form>
          </aside>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </div>
      </div>
    )
  }
})

module.exports = Login;
