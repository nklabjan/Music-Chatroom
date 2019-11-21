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
            messages: [],
        }

        this.info = this.props.loungeInfo
        this.socket = null;
        this.playSong = this.playSong.bind(this);
        this.setUpSocket();
        this.setDeviceId = this.setDeviceId.bind(this);

    }

    async setUpSocket() {
        this.socket = io(urls.backend_url);
        var lounge = this;

        this.socket.on('user_connected', function(user) {
            //Handle adding user to userList
            lounge.setState({users: [...lounge.state.users, user]});
            // var user_div = document.createElement("div");
            // var user_name = document.createElement("p");
            // user_name.innerHTML = user;
            // user_div.appendChild(user_name);
            // document.getElementsByClassName('members')[0].appendChild(user_div);
        })

        this.socket.on('user_disconnected', function(user) {
            console.log(user);
            //Handle removing users from list
            for (var i = 0; i < lounge.state.users.length; i++)
            {
              if (lounge.state.users[i].id === user.id)
              {
                const newList = lounge.state.users.splice(i, 1);
                lounge.setState({users: newList});
              }
            }

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

        this.socket.on('message_received', function(msgBlob) {

          //add ChatBubble to ChatList whenever there's new message
          // console.log(this.state.messages)
          //old messages -> new messages
          lounge.setState({messages: [msgBlob, ...lounge.state.messages]});
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
                      this.info.id)
    }

    componentWillMount(){
      this.socket.emit('user_connected', this.props.access_token, this.info.id, this.props.userInfo);
    }
    render() {

            return (
                <div className="lounge">

                    <div className="loungeContainer">
                        <Queue  socket={this.socket}
                                playSong={this.playSong} />
                        <Chat socket={this.socket}
                              loungeInfo={this.info}
                              messages={this.state.messages}/>
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
      console.log(this.info.id);
      this.socket.emit('user_disconnected', this.info.id);
    }
}

export default Lounge;
