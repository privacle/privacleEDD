const React = require('react');
const auth = require('../auth');

const Profile = React.createClass({

  render : function() {
    return (
      <div>
        <h1>Profile</h1>
        <div className="card-panel" style={{width: '80%', margin: 'auto'}}>
        </div>
      </div>
    )
  }
});

module.exports = Profile;
