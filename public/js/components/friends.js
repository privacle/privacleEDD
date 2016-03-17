const React = require('react');
const auth = require('../auth');

const Friends = React.createClass({

  render : function() {
    return (
      <div>
        <h1>My Friends</h1>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <div className="row placeholders">
            <div className="col-xs-6 col-sm-3 placeholder">
              <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" width={200} height={200} alt="Generic placeholder thumbnail" />
              <h4>Title</h4>
              <span className="text-muted">Date: 11-11-1111</span>
              <span className="text-muted">Time: 11:11</span>
              <span className="text-muted">Location: New York</span>
              <span className="text-muted">Description: Learn JS</span>
              <span className="text-muted">Created By: EDD </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Friends;