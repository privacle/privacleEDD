const React = require('react');
const auth = require('../auth');
const GoogleMap = require('./googlemap.js');

const Dashboard = React.createClass({
  getInitialState : function() {
    return {
      me: ''
    }
  },
  componentWillMount : function() {

    $.ajax({
      url: '/api/events',
      type: 'GET',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      }
    })
    .done((data) => {
      let markers = [];
      data.forEach((el) => {
        markers.push( [el.lat, el.lng] );
      });
      markers = JSON.stringify(markers);
      localStorage.markers = markers;
    });
  },
  componentDidMount : function() {

  },
  render : function() {
    const token = auth.getToken()
    return (
      <div>
        <h1>Events Map</h1>
        <GoogleMap />
      </div>
    )
  }
})



module.exports = Dashboard;
