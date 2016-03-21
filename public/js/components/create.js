const React = require('react');
const auth = require('../auth');
const GoogleMap = require('./googlemap.js');




const Create = React.createClass({

  getInitialState : function() {
    return {
      circles: []
    }
  },
  handleSubmit : function(event) {
    event.preventDefault();

    // select circles to be added to
    let arrCircles = [];
    $('.clicked').each((index,value) => {
      arrCircles.push($(value).text());
    })

    arrCircles = JSON.stringify(arrCircles);
    // event object to DB
    let newEvent = {
      name: this.refs.name.value,
      event_date: this.refs.date.value,
      event_time: this.refs.time.value,
      description: this.refs.description.value,
      location: this.refs.location.value,
      img_url: this.refs.img_url.value,
      lat: +(localStorage.lat),
      lng: +(localStorage.lng),
      circles: arrCircles
    }

    // posting new event to DB
    $.ajax({
      url: '/api/events',
      type: 'post',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      },
      data: newEvent
    })
    .done((data) => {
      console.log(data);
    })
    $('#createEventForm').hide()
    $('#createEventPage').append('<div>').addClass('card-panel').attr('style','font-size: 4em;').text('Congruatulations!! You just create an events! Go to My Events and checkout!')
  },
  componentWillMount : function() {

    $.ajax({
      url: '/api/friends/circles',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      }
    })
    .done((data) => {
      this.state.circles = data;
      this.setState({ circles: this.state.circles });
    })
  },
  renderCircleBtns : function(key) {
    return (
      <CircleBtn key={key} index={key} details={this.state.circles[key]} />
    )
  },
  render : function() {
    return (
      <div id="createEventPage">
        <h1>Create event</h1>
        <form id="createEventForm" className="card-panel" style={{width: '80%', margin: 'auto'}} onSubmit={this.handleSubmit} >
            <div>
              <label htmlFor="name">Event Name</label>
              <div>
                <input id="name" ref="name" type="text" placeholder="Event Name" required />
              </div>
            </div>
            <div >
              <label htmlFor="name">Image URL</label>
              <div>
                <input id="img_url" ref="img_url" type="text" placeholder="Image URL" />
              </div>
            </div>
            <div >
              <label htmlFor="name">Date</label>
              <div >
                <input id="date" ref="date" type="date" placeholder="Date" />
              </div>
            </div>
            <div>
              <label htmlFor="name">Time</label>
              <div>
                <input id="time" ref="time" type="time" placeholder="Time" />
              </div>
            </div>
            <div>
              <label htmlFor="name">Location</label>
              <div>
                <input id="location" className="controls" ref="location" type="text" placeholder="Location" />
              </div>
            </div>
            <div>
              <label htmlFor="name">Description</label>
              <div>
                <input id="discription" ref="description" type="text" placeholder="Description" />
              </div>
            </div>

            <div className="input-field col s12 m6">
              <div className="select-wrapper">
                <label>Circles</label>
                <select className="browser-default">
                  {
                    Object.keys(this.state.circles).map(this.renderCircleBtns)
                  }
                </select>
              </div>
            </div>

            <div>
              <div>
                <button id="submit" type="submit" className="btn waves-effect waves-light light-blue darken-4">Submit</button>
              </div>
            </div>
        </form>

        <div style={ { display: 'none' } } >
          <GoogleMap />
        </div>
      </div>
    )
  }
});

const CircleBtn = React.createClass({

  handleClick : function(event) {
    $(event.target).addClass('clicked');

  },
  render : function() {
    return (
      <option>
          {this.props.details.tag}
      </option>
    )
  }
});

module.exports = Create;
