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
            displayProfile: false,
        }
        this.id = this.props.loungeID
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
            document.getElementsByClassName('members')[0].appendChild(user_div);
        })

        this.socket.on('user_disconnected', function(user) {
            console.log(user);
            //Handle removing users from list

        })

        this.socket.on('new_room', function(user) {
            console.log(user);
            //Handle removing users from list

        })
        this.forceUpdate();
    }

    componentWillMount(){
      this.socket.emit('user_connected', this.props.access_token, this.id);
    }
    render() {

            return (
                <div className="lounge">

                    <div className="loungeContainer">
                        <Queue socket={this.socket}/>
                        <Chat socket={this.socket}/>
                        <UserList />
                    </div>
                    <Player access_token={this.props.access_token}
                            socket={this.socket}
                            handleHome={this.props.handleHome}/>

                </div>
            )
        }

    componentWillUnmount(){
      console.log(this.props.loungeID);
      this.socket.emit('user_disconnected', this.props.access_token);
    }
}

export default Lounge;
