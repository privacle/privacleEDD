const React = require('react');
const auth = require('../auth');

const NotFound = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Not found!</h3>
      </div>
    )
  }
});

module.exports = NotFound;