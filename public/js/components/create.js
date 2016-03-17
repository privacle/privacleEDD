const React = require('react');
const auth = require('../auth');
const GoogleMap = require('./googlemap.js');




const Create = React.createClass({

  handleSubmit : function(event) {
    event.preventDefault();

    let newEvent = {
      name: this.refs.name.value,
      event_date: this.refs.date.value,
      event_time: this.refs.time.value,
      description: this.refs.description.value,
      location: this.refs.location.value,
      img_url: this.refs.img_url.value,
      lat: +(localStorage.lat),
      lng: +(localStorage.lng)
    }

    $.ajax({
      url: '/events',
      type: 'post',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      },
      data: newEvent
    })
    .done((data) => {
      console.log(data);
    })
  },
  render : function() {
    return (
      <div>
        <h1>Create event</h1>
        <form className="card-panel" style={{width: '80%', margin: 'auto'}} onSubmit={this.handleSubmit} >
          <fieldset style={{marginTop: 20}}>
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
            {/* Button */}
            <div>
              <div>
                <button id="submit" type="submit" className="btn waves-effect waves-light light-blue darken-4">Submit</button>
              </div>
            </div>
          </fieldset>
        </form>


        
        <div style={ { display: 'none' } } >
          <GoogleMap />
        </div>
      </div>
    )
  }
});

module.exports = Create;
