const React = require('react');
const auth = require('../auth');

const Find = React.createClass({
  getInitialState : function() {
    return {
      events: {},
      users: {}
    }
  },
  handleSubmit : function(event) {
    event.preventDefault();

    // reset state for each new search result
    this.state.events = {};
    this.state.users = {};
    this.setState({
      events: this.state.events,
      users: this.state.users
    });
    // grab values of search input fields
    let eventSearch   = this.refs.event.value;
    let eventSearchId = this.refs.event_id.value;
    let userSearch    = this.refs.user_email.value;
    let userSearchId  = this.refs.user_id.value;
    // check search for event vs. user
    if(eventSearch || eventSearchId) {
      // check search event by name vs. id
      if(eventSearch) {
        $.ajax({
          url: '/api/events/name/' + eventSearch,
          type: 'GET',
          beforeSend: function( xhr ) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
          }
        })
        .done((data) => {
          console.log('event search name: ', data);
          data.forEach((el) => {
            this.state.events[el.event_id] = el;
            this.setState({ events: this.state.events });
          });
        })
      } else {
        $.ajax({
          url: '/api/events/id/' + eventSearchId,
          type: 'GET',
          beforeSend: function( xhr ) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
          }
        })
        .done((data) => {
          console.log('event search id: ', data);

          this.state.events[data.event_id] = data;
          this.setState({ events: this.state.events });
        })
      }
    } else {
      // check search user by name vs. id
      if(userSearch) {
        $.ajax({
          url: '/api/users/email/' + userSearch,
          type: 'GET',
          beforeSend: function( xhr ) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
          }
        })
        .done((data) => {
          console.log('user search name: ', data);

          this.state.users[data.user_id] = data;
          this.setState({ users: this.state.users });
        })
      } else {
        $.ajax({
          url: '/api/users/id/' + userSearchId,
          type: 'GET',
          beforeSend: function( xhr ) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
          }
        })
        .done((data) => {
          console.log('user search id: ', data);

          this.state.users[data.user_id] = data;
          this.setState({ users: this.state.users });
        })
      }
    }

    this.refs.eventSearchForm.reset();
    this.refs.userSearchForm.reset();
  },
  renderEvents : function(key) {
    return (
      <EventResult key={key} index={key} details={this.state.events[key]} />
    )
  },
  renderUsers : function(key) {
    return (
      <UserResult key={key} index={key} details={this.state.users[key]} />
    )
  },
  hideSearchform : function(){
    $('#searchbyEvent').hide();
    $('#searchbyUser').hide();
  },

  showSearchform : function(){
    $('#searchbyEvent').show();
    $('#searchbyUser').show();
  },
  render : function() {
    return (
      <div>
        <h1>Find stuff</h1>
        <div className="card-panel" style={{width: '80%', margin: 'auto'}}>
          <div>
            <form onSubmit={this.handleSubmit} ref="eventSearchForm">
              <input type="text" ref="event" placeholder="Search by event name" />
              <input type="text" ref="event_id" placeholder="Search by event ID" />
              <button type="submit" onClick={this.hideSearchform} className="btn waves-effect waves-light light-blue darken-4">Search</button>
            </form>
          </div>
          <div>
            <form onSubmit={this.handleSubmit} ref="userSearchForm">
              <input type="text" ref="user_email" placeholder="Search by user email" />
              <input type="text" ref="user_id" placeholder="Search by user ID" />
              <button type="submit" onClick={this.hideSearchform} className="btn waves-effect waves-light light-blue darken-4">Search</button>
            </form>
            <button className="btn right waves-effect waves-light light-blue darken-4" onClick={this.showSearchform} style={{width: 96.6719}}>Back</button>
          </div>
        </div>

        <div>
          <ul>

            {
              Object.keys(this.state.events).map(this.renderEvents)
            }

          </ul>
        </div>

        <div>
          <ul>

            {
              Object.keys(this.state.users).map(this.renderUsers)
            }

          </ul>
        </div>

      </div>
    )
  }
});


const EventResult = React.createClass({

  render : function() {
    return (
      <li>
        <div>
          Event name: {this.props.details.name}
        </div>
      </li>
    )
  }
});

const UserResult = React.createClass({

  addFriend : function(event) {
    console.log('adding friend');
  },

  render : function() {
    return (
      <li>
        <div className="row">
          <div className="col s12 m3" style={{marginLeft: 100, width: '20%'}}>
            <div className="card">
              <div className="card-content">
                <h3>{this.props.details.email}</h3>
              </div>
              <div className="card-action">
                <button onClick={this.addFriend}>Add friend</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
});









module.exports = Find;
