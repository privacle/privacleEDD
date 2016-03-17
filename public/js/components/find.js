const React = require('react');
const auth = require('../auth');

const Find = React.createClass({

  handleSubmit : function(event) {
    event.preventDefault();


    console.log('search for stuff!');
  },

  render : function() {
    return (
      <div>
        <h1>Find stuff</h1>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" ref="event" placeholder="Search by event" />
            </form>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" ref="user" placeholder="Search by user" />
            </form>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Find;