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
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          
          <ul>

            { Object.keys(this.state.events).map(this.renderEvent) }

          </ul>
        </div>
      </div>
    )
  }
});

const Event = React.createClass({
  render : function() {
    return (
      <li>
        <div>
          Name: {this.props.details.name} <br />
          Location: {this.props.details.location} <br />
          Date: {this.props.details.date} <br />
          Description: {this.props.details.description} <br />
        </div>
      </li>
    )
  }
});

module.exports = Events;