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
const NotFound = require('./components/404.js');
const Circles = require('./components/circles.js');
const Welcome = require('./components/welcome.js')

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

  hideButtons(){
    $('#coverButtons').hide()
    $('#signupform').show()
  },

  showButtons(){
    $('#coverButtons').show()
  },

  render() {
    if(this.state.loggedIn) {
      return (
        <div>
          <div className="masthead">
          <Link to ="/" id="homepageLogo"><h1 className="text-muted">Privacle</h1></Link>
          <nav className="light-blue darken-4">
            <ul className="nav nav-justified light-blue accent-3">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/create">Create</Link></li>
              <li><Link to="/find">Find</Link></li>
              <li><Link to="/friends">Friends</Link></li>
              <li><Link to="/events">My Events</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/circles">Circles</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </nav>
          {this.props.children || <Welcome />}
          </div>
          <footer style={{position: 'relative', bottom: '0px !important', width: '100%'}} className="page-footer light-blue darken-4">
            <div className="container">
              <div className="row">
                <div className="col l6 s12">
                  <h5 className="white-text">Made by EDD</h5>
                  <p className="grey-text text-lighten-4">General Assembly NYC WDI Bowie Group Project</p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="white-text">Links</h5>
                  <ul>
                    <li><a className="grey-text text-lighten-3" href="https://generalassemb.ly/new-york-city">General Assembly</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://github.com/privacle/privacleEDD">Privacle Github Page</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container">
                © 2016 Copyright Text
                <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
              </div>
            </div>
          </footer>
        </div>
      )

    } else {
      return (
        <div>
          <div className="nav-wrapper" id="coverCardpanel">
            <nav className="light-blue darken-4" style={{width: '80%', margin: 'auto'}}>
              <a href="/" className="brand-logo">Privacle</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li onClick={this.showButtons}><Link to="/">Home</Link></li>
              </ul>
            </nav>
          </div>
          <div className="row" id="coverButtons">
            <section className="col s12" style={{width: '100%', textAlign: 'center', marginTop: 70, position: 'relative'}}>
              <section className="col s5" style={{marginLeft: '30%'}}>
                <aside className="card-panel" style={{width: '100%', margin: 'auto', position: 'relative', marginTop: 7}}>
                  <form onSubmit={this.handleSubmit}>
                    <h3>Welcome!</h3>
                    <div className="row">
                      <Link to="/login"><button onClick={this.hideButtons} className="btn waves-effect waves-light col s6 light-blue darken-4">Log in</button></Link>
                      <Link to="/signup"><button onClick={this.hideButtons} className="btn waves-effect waves-light col s6 light-blue darken-4">Signup</button></Link>
                    </div>
                  </form>
                </aside>
              </section>
            </section>
          </div>
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        <footer style={{position: 'absolute', bottom: '0px !important', width: '100%'}} className="page-footer light-blue darken-4">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Made by EDD</h5>
                <p className="grey-text text-lighten-4">General Assembly NYC WDI Bowie Group Project</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="https://generalassemb.ly/new-york-city">General Assembly</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://github.com/privacle/privacleEDD">Privacle Github Page</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2016 Copyright Text
              <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
      </div>
      )
    }
  }
})


function deleteScripts() {
    // functions to clear googlemap scripts
    console.log('executing deleteScripts');
  $('script').each((index, value) => {
    if($(value).hasClass('keep')) {
    } else {
      $(value).remove();
    }
  });

  $('link').each((index, value) => {
    if($(value).hasClass('keep')) {
    } else {
      $(value).remove();
    }
  });

  $('style').each((index, value) => {
    if($(value).hasClass('keep')) {
    } else {
      $(value).remove();
    }
  });
}


ReactDOM.render((
  <Router history={browserHistory} >
    <Route path="/" component={App} onEnter={deleteScripts} >
      <Route path="login" component={Login} onEnter={deleteScripts} />
      <Route path="signup" component={Signup} onEnter={deleteScripts} />
      <Route path="logout" component={Logout} onEnter={deleteScripts} />
      <Route path="dashboard" component={Dashboard} onEnter={deleteScripts} />
      <Route path="create" component={Create} onEnter={deleteScripts} />
      <Route path="find" component={Find} onEnter={deleteScripts} />
      <Route path="friends" component={Friends} onEnter={deleteScripts} />
      <Route path="events" component={Events} onEnter={deleteScripts} />
      <Route path="profile" component={Profile} onEnter={deleteScripts} />
      <Route path="circles" component={Circles} onEnter={deleteScripts} />
    </Route>
    <Route path="*" component={NotFound} onEnter={deleteScripts} />
  </Router>
), document.getElementById('container'))
