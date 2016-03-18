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

    $.post('/api/guests/', signupInfo)
      .done((data) => {
        console.log(data);
        if(data) {
          $('#coverButtons').hide()
          $('#signupform').show()
          alert('Signup Error, Email Already Exists!')
        }else {
        }
      })
      .error((error) => {
        console.error(error);
      })
  },
  hideForm : function(){
    $('#signupform').hide()
  },

  render : function() {
    return (
      <div>
        <div id="signupform" style={{width: '30%', margin: 'auto', marginTop: '10px'}}>
          <aside className="card-panel">
            <form ref="formSignup" onSubmit={this.handleSubmit}>
              <h2 className="form-signin-heading">Please sign up</h2>
              <label htmlFor="inputEmail" >Email address</label>
              <input ref="email" type="email" id="inputEmail" className="form-control"  placeholder="Email address" autofocus />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input ref="pass"  type="password" id="inputPassword" placeholder="Password" />
              <button type="submit" onClick={this.hideForm} className="btn waves-effect waves-light light-blue darken-4">Submit</button>
            </form>
          </aside>
        </div>
      </div>
    )
  }
});

module.exports = Signup;
