const React = require('react');
const auth = require('../auth');
const Dropzone = require('react-dropzone');
const request = require('superagent');

const Profile = React.createClass({

  getInitialState: function () {
      return {
        files: []
      };
  },
  handleSubmit : function(event) {
    event.preventDefault();

    let fn  = this.refs.firstName.value;
    let ln  = this.refs.lastName.value;
    let bio = this.refs.bio.value;
    let dp  = this.state.files[0].preview;

    let profile = {
      first_name : fn,
      last_name : ln,
      bio : bio,
      profile_pic: dp
    }

    $.ajax({
      url: '/api/users',
      type: 'PUT',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", 'Bearer ' + auth.getToken() );
      },
      data: profile
    })
    .done(() => {
      console.log('profile updated');
    });

  },
  onDrop: function(files){
    this.setState({
      files: files
    });

    var req = request.post('/upload');
    files.forEach((file)=> {
        req.attach(file.name, file);
    });
    req.end(function(err, res){
      console.log('did it post?');
    });

    $('#dropZone').hide();
  },
  render : function() {
    return (
      <div>
        <h1>Profile</h1>
        <div className="card-panel" style={{width: '80%', margin: 'auto'}}>
          <form ref="profileForm" onSubmit={this.handleSubmit}>
            <label htmlFor="firstName" className="sr-only">First name</label>
            <input ref="firstName"  type="text" id="firstName" placeholder="First name" />
            <label htmlFor="lastName" className="sr-only">Last name</label>
            <input ref="lastName"  type="text" id="lastName" placeholder="Last name" />
            <label htmlFor="bio" className="sr-only">About you</label>
            <input ref="bio"  type="text" id="bio" placeholder="Tell us something about you" />
        
            <Dropzone onDrop={this.onDrop} id="dropZone">
              <div>Try dropping your image here, or click to select image to upload.</div>
            </Dropzone>
            {this.state.files.length > 0 ? <div>
              <h5>Profile picture uploaded</h5>
              <div>{this.state.files.map((file) => <img className="dzPreview" src={file.preview} /> )}</div>
              </div> : null}


            <button type="submit" className="btn waves-effect waves-light light-blue darken-4">Submit</button>
          </form>
        </div>
      </div>
    )
  }
});



module.exports = Profile;
