const React = require('react');
const auth = require('../auth');

const Dashboard = React.createClass({
  getInitialState : function() {
    return {
      me: ''
    }
  },
  seeMe : function() {
    $.ajax({
      url: 'users/me',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", auth.getToken() );
      }
    }).done((data) => {
      this.setState({me: data.agent.email})
    })
  }, 

  render : function() {
    const token = auth.getToken()
    return (
      <div>
        <h1>Dashboard</h1>

      </div>
    )
  }
})

module.exports = Dashboard;