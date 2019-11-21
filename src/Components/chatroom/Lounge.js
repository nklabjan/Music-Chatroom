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
            deviceId: null,
            users: [],
        }

        this.id = this.props.loungeID
        this.socket = null;
        this.playSong = this.playSong.bind(this);
        this.setUpSocket();
        this.setDeviceId = this.setDeviceId.bind(this);

    }

    async setUpSocket() {
        this.socket = io(urls.backend_url);
        var lounge = this;

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
            //Handle adding user to userList
            lounge.setState({users: [...lounge.state.users, user]});
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

        this.socket.on('play_song', function(song_uri) {
            console.log("Room is now playing " + song_uri);
            //Handle removing users from list

            fetch('https://api.spotify.com/v1/me/player/play?device_id=' + lounge.state.deviceId, {
              method: "PUT",
              headers: {
                authorization: `Bearer ${lounge.props.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ uris: [song_uri] }),
            });

        })
    }

    setDeviceId(device_id){
      this.setState({deviceId: device_id});
    }

    playSong(song_uri) {
    //Sends device ID and Access token to backend to play music
    //through socket
    //Hardcode to play "spotify:track:5bvNpG6wiIEf1PA13TkTu2" for now
    //console.log(this.props)
    //let song = this.props.uri;
    this.socket.emit( 'play_song',
                      this.props.access_token,
                      this.state.deviceId,
                      song_uri,
                      this.id)
    }

    componentWillMount(){
      this.socket.emit('user_connected', this.props.access_token, this.id, this.props.userInfo);
    }
    render() {

            return (
                <div className="lounge">

                    <div className="loungeContainer">
                        <Queue socket={this.socket} playSong={this.playSong} />
                        <Chat socket={this.socket} loungeID={this.id}/>
                        <UserList users={this.state.users}/>
                    </div>
                    <Player access_token={this.props.access_token}
                            socket={this.socket}
                            handleHome={this.props.handleHome}
                            setDeviceId={this.setDeviceId}
                            />

                </div>
            )
        }

    componentWillUnmount(){
      console.log(this.props.loungeID);
      this.socket.emit('user_disconnected', this.props.access_token, this.id);
    }
}

export default Lounge;
