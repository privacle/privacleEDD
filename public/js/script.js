'use strict'
console.log('react hered');

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const browserHistory = require('react-router').browserHistory;
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const auth = require('./auth');



const App = React.createClass({
  getInitialState : function() {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  updateAuth : function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },
  componentWillMount : function() {
    auth.onChange = this.updateAuth
    auth.login()
  },
  render : function() {

    if(this.state.loggedIn) {
      return (
        <div>
          <div className="masthead">
          <h3 className="text-muted">Privacle</h3>
          <nav className="light-blue darken-4">
            <ul className="nav nav-justified light-blue accent-3">
              <li className="active"><a href="#">Home</a></li>
              <li><Link to="/create">Create</Link></li>
              <li><Link to="/find">Find</Link></li>
              <li><Link to="/friends">Friends</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </nav>
        </div>
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
          <div>
          GOOGLE MAP GOES HERE
          </div>
        </div>
      )

    } else {

      return (
        <div className="container">
        <nav className="light-blue darken-4">
          <a id="logo-container" href="/" className="brand-logo">Privacle</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="active"><Link to="/">Home</Link></li>
          </ul>
        </nav>
          <div className="row">
            <section className="col s12" style={{marginTop: 20, position: 'relative', left: '30%'}}>
              <section className="col s5">
                <aside className="card-panel">
                <form onSubmit={this.handleSubmit}>

                  <h3>Welcome!</h3>
                  <div className="row">
                    <Link to="/login"><button className="btn waves-effect waves-light col s6 light-blue darken-4">Log in</button></Link>
                    <Link to="/signup"><button className="btn waves-effect waves-light col s6 light-blue darken-4">Signup</button></Link>
                  </div>
                </form>
                </aside>
                </section>
              </section>
          </div>
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </div>
      )
    }
  }
});

const Dashboard = React.createClass({
  getInitialState : function() {
    return {
      me: ''
    }
  },
  seeMe : function() {
    $.ajax({
      url: 'users/me',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", auth.getToken() );
      }
    }).done((data) => {
      this.setState({me: data.agent.email})
    })
  },
  render : function() {
    const token = auth.getToken()
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

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
              <div className="checkbox">
                <label>
                  <input type="checkbox" defaultValue="remember-me" /> Remember me
                </label>
              </div>
              <button type="submit" className="btn waves-effect waves-light light-blue darken-4" style={{display: 'inline', width: 150, marginTop: 0}}>Login</button>
            </form>
            </aside>
          </div>
          {this.state.error && (
            <p>Bad login information</p>
          )}
      </div>
    )
  }
})

const Create = React.createClass({
  //name, img_url, date, time, locaiton, description

  render : function() {
    return (
      <div>
        <h1>Create event</h1>
        <form className="form-horizontal">
        <fieldset style={{marginTop: 20}}>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="name">Event Name</label>
            <div className="col-md-6">
              <input id="name" ref="name" type="text" placeholder="Event Name" className="form-control input-md" required />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="name">Image URL</label>
            <div className="col-md-6">
              <input id="img_url" ref="img_url" type="text" placeholder="Image URL" className="form-control input-md" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="name">Date</label>
            <div className="col-md-6">
              <input id="date" ref="date" type="date" placeholder="Date" className="form-control input-md" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="name">Time</label>
            <div className="col-md-6">
              <input id="time" ref="time" type="time" placeholder="Time" className="form-control input-md" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="name">Location</label>
            <div className="col-md-6">
              <input id="location" ref="location" type="text" placeholder="Location" className="form-control input-md" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="name">Description</label>
            <div className="col-md-6">
              <input id="discription" ref="description" type="text" placeholder="Description" className="form-control input-md" />
            </div>
          </div>
          {/* Button */}
          <div className="form-group">
            <div className="col-md-4">
              <button id="submit" type="submit" className="btn btn-lg" style={{marginTop: 50, backgroundImage: 'linear-gradient(to bottom,#a94442 0,#a94442 100%)', color: 'white'}}>Submit</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    )
  }
});

const Find = React.createClass({

  render : function() {
    return (
      <div>
        <h1>Find stuff</h1>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <div className="row placeholders">
            <div className="col-xs-6 col-sm-3 placeholder">
              <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" width={200} height={200} alt="Generic placeholder thumbnail" />
              <h4>Title</h4>
              <span className="text-muted">Date: 11-11-1111</span>
              <span className="text-muted">Time: 11:11</span>
              <span className="text-muted">Location: New York</span>
              <span className="text-muted">Description: Learn JS</span>
              <span className="text-muted">Created By: EDD </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const Friends = React.createClass({

  render : function() {
    return (
      <div>
        <h1>My Friends</h1>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <div className="row placeholders">
            <div className="col-xs-6 col-sm-3 placeholder">
              <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" width={200} height={200} alt="Generic placeholder thumbnail" />
              <h4>Title</h4>
              <span className="text-muted">Date: 11-11-1111</span>
              <span className="text-muted">Time: 11:11</span>
              <span className="text-muted">Location: New York</span>
              <span className="text-muted">Description: Learn JS</span>
              <span className="text-muted">Created By: EDD </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const Events = React.createClass({

  render : function() {
    return (
      <div>
        <h1>My Events</h1>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <div className="row placeholders">
            <div className="col-xs-6 col-sm-3 placeholder">
              <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" width={200} height={200} alt="Generic placeholder thumbnail" />
              <h4>Title</h4>
              <span className="text-muted">Date: 11-11-1111</span>
              <span className="text-muted">Time: 11:11</span>
              <span className="text-muted">Location: New York</span>
              <span className="text-muted">Description: Learn JS</span>
              <span className="text-muted">Created By: EDD </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

const Profile = React.createClass({

  render : function() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    )
  }
});

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
              <button type="submit" className="btn waves-effect waves-light light-blue darken-4" >Submit</button>
            </form>
            </aside>
          </div>
      </div>
    )
  }
});



const Logout = React.createClass({
  componentDidMount : function() {
    auth.logout()
  },

  render : function() {
    return <p>You are now logged out</p>
  }
})

// function requireAuth(nextState, replace) {
//   if (!auth.loggedIn()) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }





ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="logout" component={Logout} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="create" component={Create} />
      <Route path="find" component={Find} />
      <Route path="friends" component={Friends} />
      <Route path="events" component={Events} />
      <Route path="profile" component={Profile} />
    </Route>
  </Router>
), document.getElementById('container'))
