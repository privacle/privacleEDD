const React = require('react');
const auth = require('../auth');

const Events = React.createClass({

  getInitialState : function() {
    return {
      events: {}
    }
  },
  componentWillMount : function() {
    console.log('hered');
    $.ajax({
      url: '/api/events/myevents',
      type: 'GET',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      }
    })
    .done((data) => {
      data.forEach((el) => {
        this.state.events[el.event_id] = el;
        this.setState({ events: this.state.events });
      })
    });


  },
  renderEvent : function(key) {
    return (
      <Event key={key} index={key} details={this.state.events[key]} />
    )
  },

  render : function() {
    return (
      <div>
        <h1>My Events</h1>
        <div className="col s12 m6 l4 row">
          <ul>
            <li>
            { Object.keys(this.state.events).map(this.renderEvent) }
            </li>
          </ul>
        </div>
      </div>
    )
  }
});

const Event = React.createClass({
  render : function() {
    return (
        <div className="col s12 m12 l4" style={{marginTop: 30, marginLeft: 30, width: 250, height: 'auto', overflow: 'hidden'}}>
          <div className="map-card">
            <div className="card" style={{height:'400px', width: "200px"}}>
              <div className="card-image waves-effect waves-block waves-light">
              <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" alt className="circle responsive-img activator card-profile-image" />
              </div>
              <div className="card-content">
                <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
                <i className="mdi-maps-pin-drop" />
                </a>
                <h5 className="card-title grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">{this.props.details.name}</a>
                </h5>
                <p><i className="cyan-text text-darken-2" /> Date: {this.props.details.date}</p>
                <p><i className="cyan-text text-darken-2" /> Time {this.props.details.time}</p>
                <p><i className="cyan-text text-darken-2" /> Location: {this.props.details.location}</p>
                <p><i className="cyan-text text-darken-2" /> Description: {this.props.details.description}</p>
                <button className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719}}>Add Event</button>
              </div>
              <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{this.props.details.name}<i className="mdi-navigation-close right" /></span>

              google map component goes here
              </div>
            </div>
          </div>
        </div>
    )
  }
});

module.exports = Events;
