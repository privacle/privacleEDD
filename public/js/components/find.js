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

          data.forEach((el) => {
            this.state.events[el.event_id] = el;
            this.setState({ events: this.state.events });
          });
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

          data.forEach((el) => {
            this.state.users[el.user_id] = el;
            this.setState({ users: this.state.users });
          });
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

          data.forEach((el) => {
            this.state.users[el.user_id] = el;
            this.setState({ users: this.state.users });
          });
        })
      }
    }

    this.refs.eventSearchForm.reset();
    this.refs.userSearchForm.reset();
  },

  hideSearchform : function(){
    $('#searchform').hide()
  },

  render : function() {
    return (
      <div>
        <h1>Find stuff</h1>
        <div id="searchform" className="card-panel" style={{width: '80%', margin: 'auto'}}>
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
          </div>
        </div>

        <DisplayResults />
      </div>
    )
  }
});


const DisplayResults = React.createClass({

  render : function() {
    return (
      <div>
        <ul>
          <li>test 123432432</li>
          <li>test 3223432423</li>
          <li>test 3243432</li>
          <li>test 123414314</li>
        </ul>
      </div>
    )
  }
});




  // <div className="row">
  //   <div className="col s12 m3" data-reactid=".0.1.2.0" style={{marginLeft: 100, width: '20%'}}>
  //     <div className="card">
  //       <div className="card-image">
  //         <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" />
  //         <span className="card-title">Card Title</span>
  //       </div>
  //       <div className="card-content">
  //         <p>I am a very simple card. I am good at containing small bits of information.
  //           I am convenient because I require little markup to use effectively.</p>
  //       </div>
  //       <div className="card-action">
  //         <a href="#">This is a link</a>
  //       </div>
  //     </div>
  //   </div>
  // </div>



module.exports = Find;
