import React, {Component} from "react";
import ChatWindow from './ChatWindow';
import Messenger from './Messenger';

import io from "socket.io-client"

class Chat extends Component {

  constructor(props) {
      super(props);
      this.state = {
        messages: [] //format {user,msg} can add timestamp in the future
      }
      this.sendMessage = this.sendMessage.bind(this);
      this.setUpSocket();

  }

  setUpSocket() {
    this.socket = io('localhost:8080');
    this.socket.on('message_received', function(msg, user) {

        var message_div = document.createElement("div");
        message_div.className = "message";
        message_div.class = "chatarea";
        var new_message = document.createElement("p");
        new_message.innerHTML = user + ": " + msg;
        message_div.appendChild(new_message);
        document.getElementsByClassName('chatWindow')[0].appendChild(message_div);

        //add ChatBubble to ChatList whenever there's new message
        // console.log(this.state.messages)
        //this.setState({messages: [...this.state.messages, {user:user,message:msg}]})
    })
  }
    sendMessage() {
        this.socket.emit('message_sent', document.getElementById('textarea').value, this.getAuthToken());
    }

    getAuthToken() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get('access_token');
    }

    render() {
        return (
                <div className="chatDisplay">
                        <ChatWindow messages={this.state.messages}/>
                        <Messenger sendMessage={this.sendMessage}/>
                </div>
        )
    }
}

export default Chat;
