const React = require('react');
const auth = require('../auth');

const Welcome = React.createClass({
  render: function(){
    return (
      <div id="welcome">
        <img src="../../img/background.png" alt="background-img" />
      </div>
    )
  }
})
module.exports = Welcome;
