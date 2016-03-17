'use strict'
console.log('react hered');

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const Login = require('./components/login.js');
const Signup = require('./components/signup.js');
const Logout = require('./components/logout.js');
const Dashboard = require('./components/dashboard.js');
const Create = require('./components/create.js');
const Find = require('./components/find.js');
const Friends = require('./components/friends.js');
const Events = require('./components/events.js');
const Profile = require('./components/profile.js');

const browserHistory = require('react-router').browserHistory;
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;
const auth = require('./auth');




// initial state of the application
const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  // function to set loggedIn state
  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  // executes on app load, assigns auth.onChange to equal this.updateAuth
  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    if(this.state.loggedIn) {
      return (
        <div>
          <div className="masthead">
          <h3 className="text-muted">Privacle</h3>
            <nav className="light-blue darken-4">
              <ul className="nav nav-justified light-blue accent-3">
                <li><Link to="/dashboard">Dashboard</Link></li>
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
})





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
