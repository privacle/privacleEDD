const React = require('react');
const GoogleMap = require('./googlemap.js');

const EventResult = React.createClass({

  render : function() {
    return (
      <li>
        <div className="col s12 m12 l4" style={{marginTop: 30, marginLeft: 30, width: 350, height: 'auto', overflow: 'hidden'}}>
          <div className="map-card">
            <div className="card" style={{height:'560px', width: "250px"}}>
              <div className="card-image waves-effect waves-block waves-light">
              <img src={this.props.details.img_url} alt className="circle responsive-img activator card-profile-image" />
              </div>
              <div className="card-content">
                <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right" onClick={this.dumpMap}>
                <i className="mdi-maps-pin-drop" />
                </a>
                <h5 className="grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">{this.props.details.name}</a>
                </h5>
                <p><i className="cyan-text text-darken-2" /> Date: {this.props.details.date}</p>
                <p><i className="cyan-text text-darken-2" /> Time {this.props.details.time}</p>
                <p><i className="cyan-text text-darken-2" /> Location: {this.props.details.location}</p>
                <p><i className="cyan-text text-darken-2" /> Description: {this.props.details.description}</p>
                <p><i className="cyan-text text-darken-2" /> Created by User: {this.props.details.owner}</p>
                <input type="hidden" id={'coords' + this.props.details.event_id} value={this.props.details.lat + ':' + this.props.details.lng} />
                <button className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719, position:"absolute"}}>Add</button>
              </div>
              <div className="card-reveal">
              <EventMap map_id = {this.props.index}/>
              <span className="card-title grey-text text-darken-4">{this.props.details.name}<i className="mdi-navigation-close right" /></span>



              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
});


let mapStyles = {
  height: '200px',
  width: '100%',
  border: '1px solid black',
  overflow: 'auto',
  display: 'block'
}

const EventMap = React.createClass({
  componentDidMount : function() {
    // localStorage.map_id = this.props.map_id;
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyDZwpThrbZbJVY1yt-oTlYePJ_s5I-GZIU&libraries=places&callback=initEventMap");
  },
  render : function() {
    return (
      <div>
        <div className="allTheMaps" id= {'map' + this.props.map_id} style={mapStyles} >
        </div>
      </div>
    )
  }
});


module.exports = EventResult;
