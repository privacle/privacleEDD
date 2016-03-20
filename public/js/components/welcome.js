const React = require('react');
const auth = require('../auth');

const Welcome = React.createClass({
  render: function(){
    return (
      <div id="welcome">
        <h1>Welcome page!</h1>
      </div>
    )
  }
})
module.exports = Welcome;
