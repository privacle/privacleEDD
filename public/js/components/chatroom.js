const React = require('react');
const auth = require('../auth');

const Chatroom = React.createClass({
  handleSubmit : function(){
    event.preventDefault();
  },

  render : function(){
    return(
      <div className="card-panel" id="chatroom" style={{position: 'relative', width: '45%', left: '51em', top: 50, height: 500}}>
        <ul id="messages" />
        <form id="chatroomForm" onSubmit={this.handleSubmit}>
          <input id="m" autoComplete="off" />
          <button className="btn waves-effect waves-light light-blue darken-4">Send</button>
        </form>
      </div>
    )
  }
})

module.exports = Chatroom;
