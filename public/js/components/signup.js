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
        }else {
          //clear/hide table
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
            <form ref="formSignup" onSubmit={this.handleSubmit}>
              <h2 className="form-signin-heading">Please sign up</h2>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input ref="email" type="email" id="inputEmail" className="form-control"  placeholder="Email address" autofocus />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input ref="pass"  type="text" id="inputPassword" className="form-control" placeholder="Password" />
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
