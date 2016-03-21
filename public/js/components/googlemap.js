const React = require('react');
const auth = require('../auth');

const GoogleMap = React.createClass({
  componentDidMount : function() {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyDZwpThrbZbJVY1yt-oTlYePJ_s5I-GZIU&libraries=places&callback=initMap");
  },
  componentWillMount : function() {
    // moved deleteScript function from here
  },
  render : function() {
    return (
      <div>
        <div id="map">
        </div>
      </div>
    )
  }
});


module.exports = GoogleMap;
