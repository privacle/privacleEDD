const React = require('react');
const auth = require('../auth');

const UserResult = React.createClass({

  addFriend : function(event) {
    console.log('adding friend');

    $.ajax({
      url: '/api/friends',
      type: 'POST',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      },
      data: {friend_id: this.props.details.user_id}
    })
    .done(() => {
      console.log('friend added');
    })
  },

  render : function() {
    return (
      <li>
        <div id="profile-card" className="card" style={{marginTop: 30, marginLeft: 30, width: 250, height: '30em', overflow: 'hidden'}}>
          <div className="card-content">
            <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" alt className="circle responsive-img activator card-profile-image" />
            <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
            <i className="mdi-action-account-circle" />
            </a>
            <span className="card-title activator grey-text text-darken-4">{this.props.details.user_id}</span>
            <p><i className="mdi-communication-email cyan-text text-darken-2" /> {this.props.details.email}</p>
            <button onClick={this.addFriend} className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719, position:"absolute"}}>Add</button>
          </div>

          <div className="card-reveal" style={{display: 'none', transform: 'translateY(0px)'}}>
            <span className="card-title grey-text text-darken-4">Test Fake Info<i className="mdi-navigation-close right" /></span>
            <p>Here is some more information about this card.</p>
            <p><i className="mdi-action-perm-identity cyan-text text-darken-2" /> Project Manager</p>
            <p><i className="mdi-action-perm-phone-msg cyan-text text-darken-2" /> +1 (612) 222 8989</p>
            <p><i className="mdi-communication-email cyan-text text-darken-2" /> mail@domain.com</p>
            <p><i className="mdi-social-cake cyan-text text-darken-2" /> 18th June 1990</p>
          </div>
        </div>
      </li>
    )
  }
});

module.exports = UserResult;
