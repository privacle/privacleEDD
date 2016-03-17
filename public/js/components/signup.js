const React = require('react');
const auth = require('../auth');

const Signup = React.createClass({

handleSubmit : function(event) {
    event.preventDefault()
    const email = this.refs.email.value
    const pass  = this.refs.pass.value

    const signupInfo = {
      email: email,
      password: pass
    }

    $.post('/users/', signupInfo)
      .done((data) => {
        console.log(data);
        if(data) {
          alert('Signup Error, Email Already Exists!')
        }
      })
      .error((error) => {
        console.error(error);
      })
  },

  render : function() {
    return (
      <div>
        <div className="form">
          <aside className="card-panel">
            <form className="form-signin" onSubmit={this.handleSubmit}>
              <h2 className="form-signin-heading">Please sign up</h2>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input ref="email" type="text" id="inputEmail" className="form-control"  placeholder="Email address" autofocus />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input ref="pass" name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" />
              <div className="checkbox">
                <label>
                <input type="checkbox" defaultValue="remember-me" /> Remember me
                </label>
              </div>
              <button type="submit" className="btn waves-effect waves-light light-blue darken-4">Submit</button>
            </form>
          </aside>
          {}
        </div>
      </div>
    )
  }
});

module.exports = Signup;
