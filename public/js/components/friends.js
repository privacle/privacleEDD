const React = require('react');
const auth = require('../auth');

const Friends = React.createClass({

  render : function() {
    return (
      <div>
        <h1>My Friends</h1>
        <div className="row">
          <div className="col s12 m3" data-reactid=".0.1.2.0" style={{marginLeft: 100, width: '20%'}}>
            <div className="card">
              <div className="card-image">
                <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" />
                <span className="card-title">Event1</span>
              </div>
              <div className="card-content">
                <ul>
                  <li className="text-muted">Date: 11-11-1111</li>
                  <li className="text-muted">Time: 11:11</li>
                  <li className="text-muted">Location: New York</li>
                  <li className="text-muted">Description: Learn JS</li>
                  <li className="text-muted">Created By: EDD </li>
                </ul>
                <div className="card-action">
                <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
});

module.exports = Friends;
