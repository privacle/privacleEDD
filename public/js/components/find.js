const React = require('react');
const auth = require('../auth');

const Find = React.createClass({

  handleSubmit : function(event) {
    event.preventDefault();


    var event = this.refs.event.value;
    var user = this.refs.user.value;
  },

  hideSearchform : function(){
    $('#searchbyEvent').hide()
    $('#searchbyUser').hide()
  },

  showSearchform : function(){
    $('#searchbyEvent').show()
    $('#searchbyUser').show()
  },
  render : function() {
    return (
      <div>
        <h1>Find stuff</h1>
        <div className="card-panel" style={{width: '80%', margin: 'auto'}}>
          <div>
            <form id="searchbyEvent" onSubmit={this.handleSubmit}>
              <input type="text" ref="event" placeholder="Search by event" />
              <button type="submit" onClick={this.hideSearchform} className="btn waves-effect waves-light light-blue darken-4">Search</button>
            </form>
          </div>
          <div>
            <form id="searchbyUser" onSubmit={this.handleSubmit}>
              <input type="text" ref="user" placeholder="Search by user" />
              <button type="submit" onClick={this.hideSearchform} className="btn waves-effect waves-light light-blue darken-4">Search</button>
            </form>
            <button className="btn right waves-effect waves-light light-blue darken-4" onClick={this.showSearchform} style={{width: 96.6719}}>Back</button>
          </div>
        </div>
        <DisplayResults />
      </div>
    )
  }
});


const DisplayResults = React.createClass({

  render : function() {
    return (
      <div>
        <ul>
          <li>test 123432432</li>
          <li>test 3223432423</li>
          <li>test 3243432</li>
          <li>test 123414314</li>
        </ul>
      </div>
    )
  }
});




  // <div className="row">
  //   <div className="col s12 m3" data-reactid=".0.1.2.0" style={{marginLeft: 100, width: '20%'}}>
  //     <div className="card">
  //       <div className="card-image">
  //         <img src="http://barkpost.com/wp-content/uploads/2015/02/wilburs_world.jpg" />
  //         <span className="card-title">Card Title</span>
  //       </div>
  //       <div className="card-content">
  //         <p>I am a very simple card. I am good at containing small bits of information.
  //           I am convenient because I require little markup to use effectively.</p>
  //       </div>
  //       <div className="card-action">
  //         <a href="#">This is a link</a>
  //       </div>
  //     </div>
  //   </div>
  // </div>



module.exports = Find;
