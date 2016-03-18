const React = require('react');
const auth = require('../auth');

const GoogleMap = React.createClass({
  componentDidMount : function() {
    loadJS("https://maps.googleapis.com/maps/api/js?key="+process.env.APIKEY+"&libraries=places&callback=initMap");
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
    return (
      <div>
        
        <div id="map">
        </div>
      </div>
    )
  }
});


module.exports = GoogleMap;