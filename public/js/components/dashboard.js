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
      url: '/api/users/me',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", auth.getToken() );
      }
    }).done((data) => {
      this.setState({me: data.agent.email})
    })
  },
  componentWillMount : function() {
        // functions to clear googlemap scripts
    $('script').each((index, value) => {
      if($(value).hasClass('keep')) {
      } else {
        $(value).remove();
      }
    });

    $('link').each((index, value) => {
      if($(value).hasClass('keep')) {
      } else {
        $(value).remove();
      }
    });

    $('style').each((index, value) => {
      if($(value).hasClass('keep')) {
      } else {
        $(value).remove();
      }
    });
  },
  render : function() {
    const token = auth.getToken()
    return (
      <div>
        <h1>Dashboard</h1>
        <GoogleMap />
      </div>
    )
  }
})

const GoogleMap = React.createClass({
  componentDidMount : function() {
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDZwpThrbZbJVY1yt-oTlYePJ_s5I-GZIU&callback=initMap');
  },
  render : function() {
    return (
      <div id="map">
      </div>
    )
  }
});


module.exports = Dashboard;
