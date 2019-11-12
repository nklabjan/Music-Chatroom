import React, {Component} from "react";
import '../../css/chatroom/Lounge.css';
import Player from './Player/Player';
import Chat from './Chat/Chat';
import Queue from './Queue/Queue';
import UserList from './UserList';
import io from "socket.io-client"
var urls = require('../../constants.js');

class Lounge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
            displayProfile: false
        }
        this.socket = null;
        this.setUpSocket();
    }

    setUpSocket() {
        this.socket = io(urls.backend_url);
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

        this.socket.on('user_connected', function(user) {
            console.log(user);
            var user_div = document.createElement("div");
            var user_name = document.createElement("p");
            user_name.innerHTML = user;
            user_div.appendChild(user_name);
            document.getElementsByClassName('userListTitle')[0].appendChild(user_div);
        })
        this.forceUpdate();
    }

    render() {

            return (
                <div className="lounge">
                    <header className="chatroom-header">
                        <button className="profile-chatroom" onClick={this.props.handleProfile}>View/Edit Your Profile</button>
                        <span className="title"><b>CHATROOM</b></span>
                        <button className="leave-chatroom" onClick={this.props.handleHome}>Leave Chatroom</button>
                    </header>

                    <div className="loungeContainer">
                        <Queue socket={this.socket}/>
                        <Chat socket={this.socket}/>
                        <UserList />
                    </div>
                    <Player access_token={this.props.access_token} socket={this.socket}/>

                </div>
            )
        }

}

export default Lounge;
