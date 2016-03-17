const React = require('react');
const auth = require('../auth');

const Events = React.createClass({

  getInitialState : function() {
    return {
      events: {
        'event1': {
          name: 'event1',
          location: 'new york',
          date: '12/12/2012',
          description: 'this is an event'
        },
        'event2': {
          name: 'event2',
          location: 'London',
          date: '12/12/2012',
          description: 'this is an event2'
        }
      }
    }
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
          {this.props.details.name}
          {this.props.details.location}
          {this.props.details.date}
          {this.props.details.description}
        </div>
      </li>
    )
  }
});

module.exports = Events;