const React = require('react');
const auth = require('../auth');

const Welcome = React.createClass({
  render: function(){
    return (
      <div id="welcome">
        <img src="../../img/background4.jpg" alt="background-img" style={{width:"100%", marginBottom: "-30px"}} />
      </div>
    )
  }
})
module.exports = Welcome;
