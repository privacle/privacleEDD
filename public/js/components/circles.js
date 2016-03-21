const React = require('react');
const auth = require('../auth');

const Circles = React.createClass({

  getInitialState : function() {
    return {
      circles: []
    }
  },
  componentWillMount : function() {

    $.ajax({
      url: '/api/friends/circles',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      }
    })
    .done((data) => {
      this.state.circles = data;
      this.setState({ circles: this.state.circles });
    });
  },
  renderCircles : function(key) {
    return (
      <Circle key={key} index={key} details={this.state.circles[key]} />
    )
  },
  render : function() {
    return(
      <div>
        <h1>My Circles</h1>
          <div>
            <ul>
              
              {
                Object.keys(this.state.circles).map(this.renderCircles)
              }

            </ul>
          </div>
        </div>
    )}
})


const Circle = React.createClass({

  getInitialState : function() {
    return {
      friends: []
    }
  },

  componentWillMount : function() {

    $.ajax({
      url: '/api/users/circle/' + this.props.details.tag,
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      }
    })
    .done((data) => {
      this.state.friends = data;
      this.setState({ friends: this.state.friends });
    });

  },
  renderFriends : function(key) {
    return (
      <CircleFriend key={key} index={key} details={this.state.friends[key]} />
    )
  },
  render : function() {
    return (
          <li>
            <div className="col s12 m12 l4" style={{marginTop: 30, marginLeft: 30, width: 350, height: 'auto', overflow: 'hidden'}}>
              <div className="map-card">
                <div className="card" style={{height:'560px', width: "250px"}}>
                  <div className="card-content">
                    <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
                    <i className="mdi-maps-pin-drop" />
                    </a>
                    <h5 className="grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">{this.props.details.tag}</a>
                    </h5>
                    <button className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719, position:"absolute"}} >Delete</button>
                  </div>
                  <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">Name<i className="mdi-navigation-close right" /></span>
                  <h2>Firends in this circle</h2>

                  <ul>
                    {
                      Object.keys(this.state.friends).map(this.renderFriends)
                    }
                  </ul>

                  </div>
                </div>
              </div>
            </div>
          </li>
    )
  }
});


const CircleFriend = React.createClass({

  render : function() {
    return (
      <li>
        <div>
          <h4>{this.props.details.email}</h4>
        </div>
      </li>
    )
  }
});

module.exports = Circles;
