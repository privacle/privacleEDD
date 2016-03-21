const React = require('react');
const auth = require('../auth');

const UserResult = React.createClass({

  addFriend : function(event) {
    let email = this.props.details.email;
    $('#usersResults').empty()
    $('#findBox').hide();
    $('#findPage').append('<h1>').addClass('card-panel').text('You have added ' + email)
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
        <div id="profile-card" className="card" style={{marginTop: 30, marginLeft: 30, width: 250, height: '100%', overflow: 'hidden'}}>
          <div className="card-content">
            <img src={"../uploads/" + this.props.details.photo} alt className="circle responsive-img activator card-profile-image" />
            <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
            <i className="mdi-action-account-circle" />
            </a>
            <span className="card-title activator grey-text text-darken-4">{this.props.details.first_name} {this.props.details.last_name}</span>
            <p><i className="cyan-text text-darken-2" />User ID: {this.props.details.user_id}</p>
            <p><i className="mdi-communication-email cyan-text text-darken-2" />Email: {this.props.details.email}</p>
            <p><i className="mdi-action-perm-identity cyan-text text-darken-2" />Bio: {this.props.details.bio}</p><br/>
            <button onClick={this.addFriend} className="btn right waves-effect waves-light light-blue darken-4" style={{width: 96.6719, margin: '10px'}}>Add</button>
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
