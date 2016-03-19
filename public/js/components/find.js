const React = require('react');
const auth = require('../auth');
const GoogleMap = require('./googlemap.js');
const UserResult = require('./userresult.js');
const EventResult = require('./eventresult.js');

const Find = React.createClass({
  getInitialState : function() {
    return {
      events: {},
      users: {}
    }
  },
  componentWillMount : function() {
    localStorage.onlyRunOnce = 'notRun';
  },
  handleSubmit : function(event) {
    event.preventDefault();
    // Load google maps script
    // loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyDZwpThrbZbJVY1yt-oTlYePJ_s5I-GZIU&libraries=places&callback=initEventMap");

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
    localStorage.onlyRunOnce = 'notRun';
    $('#searchbyEvent').show()
    $('#searchbyUser').show()
    // $('#eventsResults').empty()
    // $('#usersResults').empty()

    // reset state for each new search result
    this.state.events = {};
    this.state.users = {};
    this.setState({
      events: this.state.events,
      users: this.state.users
    });
  },
  componentDidMount : function() {
    // loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyDZwpThrbZbJVY1yt-oTlYePJ_s5I-GZIU&libraries=places&callback=initEventMap");
  },
  render : function() {
    return (
      <div>
        <h1>Find stuff</h1>
        <div className="card-panel" style={{width: '80%', margin: 'auto'}}>
          <div>
            <form onSubmit={this.handleSubmit} ref="eventSearchForm" id="searchbyEvent">
              <input type="text" ref="event" placeholder="Search by event name" />
              <input type="text" ref="event_id" placeholder="Search by event ID" />
              <button type="submit" onClick={this.hideSearchform} className="btn waves-effect waves-light light-blue darken-4">Search</button>
            </form>
          </div>
          <div>
            <form onSubmit={this.handleSubmit} ref="userSearchForm" id="searchbyUser">
              <input type="text" ref="user_email" placeholder="Search by user email" />
              <input type="text" ref="user_id" placeholder="Search by user ID" />
              <button type="submit" onClick={this.hideSearchform} className="btn waves-effect waves-light light-blue darken-4">Search</button>
            </form>
            <button className="btn right waves-effect waves-light light-blue darken-4" onClick={this.showSearchform} style={{width: 96.6719}}>New Search</button>
          </div>
        </div>

        <div id="eventsResults">
          <ul>

            {
              Object.keys(this.state.events).map(this.renderEvents)
            }

          </ul>
        </div>

        <div id="usersResults">
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





module.exports = Find;
