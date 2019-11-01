import React, {Component} from "react";
import ChatWindow from './ChatWindow';
import Messenger from './Messenger';
import '../../../css/chatroom/chat/Chat.css'
import io from "socket.io-client"


class Chat extends Component {

  constructor(props) {
      super(props);
      this.state = {
        messages: [] //format {user,msg} can add timestamp in the future
      }
      this.sendMessage = this.sendMessage.bind(this);

  }

    sendMessage() {
        this.props.socket.emit('message_sent', document.getElementById('textarea').value, this.getAuthToken());
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
