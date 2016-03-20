const React = require('react');
const auth = require('../auth');

const Events = React.createClass({

  getInitialState : function() {
    return {
      events: {}
    }
  },
  deleteEvent : function(key) {
    let that = this;

    $.ajax({
      url: '/api/events/id/' + key,
      type: 'DELETE',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      },
      data: {event_id: key}
    })
    .done(() => {
      console.log('deleted event');
      delete this.state.events[key];
      that.setState({ events: that.state.events });
    })
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
      <Event key={key} index={key} details={this.state.events[key]} deleteEvent={this.deleteEvent} />
    )
  },

  render : function() {
    return (
      <div id="myEventPage">
        <h1>My Events</h1>
        <div className="col s12 m6 l4 row">
          <ul>
            
            { Object.keys(this.state.events).map(this.renderEvent) }
            
          </ul>
        </div>
      </div>
    )
  }
});

const Event = React.createClass({

  handleClick : function(event) {
    console.log('clicked delete btn');

    this.props.deleteEvent(this.props.index);
  },
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
                <button className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719, position:"absolute"}} onClick={this.handleClick} >Delete</button>
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

module.exports = Events;
