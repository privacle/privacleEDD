const React = require('react');
const auth = require('../auth');

const UserResult = React.createClass({

  addFriend : function(event) {
    $('#searchbyEvent').show()
    $('#searchbyUser').show()
    $('#usersResults').empty()
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
            <img src={"../uploads/" + this.props.details.photo} alt className="circle responsive-img activator card-profile-image" />
            <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
            <i className="mdi-action-account-circle" />
            </a>
            <span className="card-title activator grey-text text-darken-4">{this.props.details.first_name} {this.props.details.last_name}</span><br/>
            <button onClick={this.addFriend} className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719, position:"absolute"}}>Add</button>
          </div>

          <div className="card-reveal" style={{display: 'none', transform: 'translateY(0px)'}}>
            <span className="card-title grey-text text-darken-4">{this.props.details.first_name} {this.props.details.last_name}<i className="mdi-navigation-close right" /></span>
            <label>Email</label>
            <p>{this.props.details.email}</p>
            <label>Bio</label>
            <p>{this.props.details.bio}</p>
          </div>
        </div>
      </li>
    )
  }
});

module.exports = UserResult;
