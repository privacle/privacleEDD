const React = require('react');
const auth = require('../auth');

const Create = React.createClass({

  handleSubmit : function(event) {
    event.preventDefault();

    let newEvent = {
      name: this.refs.name.value,
      event_date: this.refs.date.value,
      event_time: this.refs.time.value,
      description: this.refs.description.value,
      location: this.refs.location.value,
      img_url: this.refs.img_url.value
    }

    $.post('/events', newEvent)
      .done((data) => {
        console.log(data);
      })
  },

  render : function() {
    return (
      <div>
        <h1>Create event</h1>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <fieldset style={{marginTop: 20}}>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="name">Event Name</label>
              <div className="col-md-6">
                <input id="name" ref="name" type="text" placeholder="Event Name" className="form-control input-md" required />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="name">Image URL</label>
              <div className="col-md-6">
                <input id="img_url" ref="img_url" type="text" placeholder="Image URL" className="form-control input-md" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="name">Date</label>
              <div className="col-md-6">
                <input id="date" ref="date" type="date" placeholder="Date" className="form-control input-md" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="name">Time</label>
              <div className="col-md-6">
                <input id="time" ref="time" type="time" placeholder="Time" className="form-control input-md" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="name">Location</label>
              <div className="col-md-6">
                <input id="location" ref="location" type="text" placeholder="Location" className="form-control input-md" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="name">Description</label>
              <div className="col-md-6">
                <input id="discription" ref="description" type="text" placeholder="Description" className="form-control input-md" />
              </div>
            </div>
            {/* Button */}
            <div className="form-group">
              <div className="col-md-4">
                <button id="submit" type="submit" className="btn btn-lg" style={{marginTop: 50, backgroundImage: 'linear-gradient(to bottom,#a94442 0,#a94442 100%)', color: 'white'}}>Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
});

module.exports = Create;