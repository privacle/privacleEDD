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
          <h1>Privacle test environment</h1>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link> (authenticated) </li>
              <li><Link to="/create">Create</Link></li>
              <li><Link to="/find">Find</Link></li>
              <li><Link to="/friends">Friends</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Log out</Link></li>
            </ul>

          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </div>
      )

    } else {

      return (
        <div>
          <h1>Privacle test environment</h1>
            <ul>
              <li><Link to="/login">Login in</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </ul>

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
  componentDidMount : function() {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyDZwpThrbZbJVY1yt-oTlYePJ_s5I-GZIU&callback=initMap");
  },
  render : function() {
    const token = auth.getToken()
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
        <div id="map">

        </div>
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
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
})

const Create = React.createClass({

  render : function() {
    return (
      <div>
        <h1>Create event</h1>
      </div>
    )
  }
});

const Find = React.createClass({

  render : function() {
    return (
      <div>
        <h1>Find stuff</h1>
      </div>
    )
  }
});

const Friends = React.createClass({

  render : function() {
    return (
      <div>
        <h1>My friends</h1>
      </div>
    )
  }
});

const Events = React.createClass({

  render : function() {
    return (
      <div>
        <h1>My events</h1>
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

  render : function() {
    return (
      <div>
        <h1>sign up form</h1>
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




