const React = require('react');
const auth = require('../auth');

const Friends = React.createClass({
  getInitialState : function() {
    return {
      friends: {}
    }
  },
  deleteFriend : function(key) {

    $.ajax({
      url: '/api/friends',
      type: 'DELETE',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      },
      data: { friend_id: key }
    })
    .done(() => {
      console.log('deleted friend sucessfully');
      delete this.state.friends[key];
      this.setState({ friends: this.state.friends });
    })
  },
  componentWillMount : function() {

    $.ajax({
      url: '/api/users/friends',
      type: 'GET',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      }
    })
    .done((data) => {
      console.log('hered');
      data.forEach((el) => {
        this.state.friends[el.user_id] = el;
        this.setState({ friends: this.state.friends });
        console.log('state: ', this.state.friends);
      })
    });


  },
  renderFriend : function(key) {
    return (
      <Friend key={key} index={key} details={this.state.friends[key]} deleteFriend={this.deleteFriend} />
    )
  },
  render : function() {
    return (
      <div>
        <h1>My Friends</h1>
        <div className="col s12 m6 l4 row">
          <ul>
            {
              Object.keys(this.state.friends).map(this.renderFriend)
            }
          </ul>
        </div>
      </div>
    )}
});


const Friend = React.createClass({

  getInitialState : function() {
    return {
      droplist: []
    }
  },

  componentWillMount : function() {
    
    $.ajax({
      url: 'api/friends/circles',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      }
    })
    .done((data) => {
      data.forEach((el) => {
        this.state.droplist.push(el.tag);
        this.setState({ droplist: this.state.droplist });
      })
    });
  },
  renderOptions : function(key) {
    return (
      <DropOption key={key} index={key} details={this.state.droplist[key]} friend_id={this.props.details.user_id} />
    )
  },
  handleClick : function(event) {

    console.log('clicked on unfriend btn');
    this.props.deleteFriend(this.props.index)
  },
  render : function() {

    return (
      <li>
        <div id="profile-card" className="card" style={{marginTop: 30, marginLeft: 30, width: 300, height: 480, overflow: 'hidden'}}>
          <div className="card-content">
            <img src="http://g-ecx.images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg" alt className="circle responsive-img activator card-profile-image" />
            <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
            <i className="mdi-action-account-circle" />
            </a>
            <span className="card-title grey-text text-darken-4">User Email: {this.props.details.email}</span>
          </div>

          <div className="card-reveal" style={{display: 'none', transform: 'translateY(0px)'}}>
            <span className="card-title grey-text text-darken-4">User ID: {this.props.details.user_id}<i className="mdi-navigation-close right" /></span>
            <span><h5>Add to circle</h5></span>
            <ul>
              {
                Object.keys(this.state.droplist).map(this.renderOptions) 
              }
            </ul>
            <p>Here is some more information about this card.</p>
            <button className="btn right waves-effect waves-light light-blue darken-4" style={{width: 200, position:"absolute", display:"block"}} onClick={this.handleClick} >Unfriend</button>
          </div>
        </div>
      </li>
    )
  }
});




const DropOption = React.createClass({

  handleClick : function() {

    let circleObj = {
      friend: this.props.friend_id,
      circle: this.props.details
    }

    $.ajax({
      url: '/api/friends/circles',
      type: 'POST',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      },
      data: circleObj
    })
    .done(() => {
      console.log('success on circles');
    })
  },
  render : function() {
    return (
      <li><div onClick={this.handleClick} >{this.props.details}</div></li>
    )
  }
});

module.exports = Friends;
