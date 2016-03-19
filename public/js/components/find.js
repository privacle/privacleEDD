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

    let eventSearch   = this.refs.event.value;
    let eventSearchId = this.refs.event_id.value;
    let userSearch    = this.refs.user_email.value;
    let userSearchId  = this.refs.user_id.value;

    if(eventSearch || eventSearchId) {
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
            console.log('state: ',this.state.events);
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
    $('#searchbyEvent').hide()
    $('#searchbyUser').hide()
  },

  showSearchform : function(){
    $('#searchbyEvent').show()
    $('#searchbyUser').show()
    $('#eventsResults').hide()
    $('#usersResults').hide()
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
            <button className="btn right waves-effect waves-light light-blue darken-4" onClick={this.showSearchform} style={{width: 96.6719}}>Back</button>
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


const EventResult = React.createClass({

  render : function() {
    return (
      <li>
        <div className="col s12 m12 l4" style={{marginTop: 30, marginLeft: 30, width: 350, height: 'auto', overflow: 'hidden'}}>
          <div className="map-card">
            <div className="card" style={{height:'560px', width: "250px"}}>
              <div className="card-image waves-effect waves-block waves-light">
              <img src={this.props.details.img_url} alt className="circle responsive-img activator card-profile-image" />
              </div>
              <div className="card-content">
                <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
                <i className="mdi-maps-pin-drop" />
                </a>
                <h5 className="grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">{this.props.details.name}</a>
                </h5>
                <p><i className="cyan-text text-darken-2" /> Date: {this.props.details.date}</p>
                <p><i className="cyan-text text-darken-2" /> Time {this.props.details.time}</p>
                <p><i className="cyan-text text-darken-2" /> Location: {this.props.details.location}</p>
                <p><i className="cyan-text text-darken-2" /> Description: {this.props.details.description}</p>
                <p><i className="cyan-text text-darken-2" /> Created by User: {this.props.details.owner}</p>
                <button className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719, position:"absolute"}}>Add</button>
              </div>
              <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{this.props.details.name}<i className="mdi-navigation-close right" /></span>

              google map component goes here
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
});

const UserResult = React.createClass({

  addFriend : function(event) {

  },

  render : function() {
    return (
      <li>
      </li>
    )
  }
});









module.exports = Find;
