const React = require('react');
const auth = require('../auth');

const Circles = React.createClass({

  render : function() {
    return(
      <div>
        <h1>My Circles</h1>
          <div>
            <ul>
              <li>
                <div className="col s12 m12 l4" style={{marginTop: 30, marginLeft: 30, width: 350, height: 'auto', overflow: 'hidden'}}>
                  <div className="map-card">
                    <div className="card" style={{height:'560px', width: "250px"}}>
                      <div className="card-image waves-effect waves-block waves-light">
                      <img src="#" alt="circle image" className="circle responsive-img activator card-profile-image" />
                      </div>
                      <div className="card-content">
                        <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
                        <i className="mdi-maps-pin-drop" />
                        </a>
                        <h5 className="grey-text text-darken-4"><a href="#" className="grey-text text-darken-4"></a>
                        </h5>
                        <p><i className="cyan-text text-darken-2" /> Date: </p>
                        <p><i className="cyan-text text-darken-2" /> Time </p>
                        <p><i className="cyan-text text-darken-2" /> Location: </p>
                        <p><i className="cyan-text text-darken-2" /> Description: </p>
                        <p><i className="cyan-text text-darken-2" /> Created by User: </p>
                        <button className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719, position:"absolute"}} >Delete</button>
                      </div>
                      <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Name<i className="mdi-navigation-close right" /></span>
                      <h2>Firends in this circle</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    )}
})

module.exports = Circles;
