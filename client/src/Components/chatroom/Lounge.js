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
            queueList: [],
            queuePos: null,
        }

        this.info = this.props.loungeInfo
        this.socket = null;
        this.playSong = this.playSong.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.seekToNewPos = this.seekToNewPos.bind(this);
        this.addRandomSong = this.addRandomSong.bind(this);
        this.addSong = this.addSong.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
        this.moveToNext = this.moveToNext.bind(this);
        this.setUpSocket();
        this.setDeviceId = this.setDeviceId.bind(this);
        this.syncMusicToRoom = this.syncMusicToRoom.bind(this);

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
            //console.log(user);
            //Handle removing users from list
            for (var i = 0; i < lounge.state.users.length; i++)
            {
              if (lounge.state.users[i].id === user.id)
              {
                const newList = lounge.state.users;
                //console.log(lounge.state.users[i].display_name + " left the room.")
                newList.splice(i, 1);

                lounge.setState({users: newList});
              }
            }

        })

        this.socket.on('play_song', function(song_uri, position_ms) {
            //Handle removing users from list
            var req_body = { uris: [song_uri] }
            if (position_ms !== undefined)
            {
              req_body = { uris: [song_uri] , position_ms: position_ms};
            }

            fetch('https://api.spotify.com/v1/me/player/play?device_id=' + lounge.state.deviceId, {
              method: "PUT",
              headers: {
                authorization: `Bearer ${lounge.props.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(req_body),
            });

        })

        this.socket.on('message_received', function(msgBlob) {

          //add ChatBubble to ChatList whenever there's new message
          // console.log(this.state.messages)
          //old messages -> new messages
          lounge.setState({messages: [msgBlob, ...lounge.state.messages]});
        })

        this.socket.on('queue_received', function(queueList, pos) {

          //add QueueList to this.state.queue
          lounge.setState({queueList: queueList});
          lounge.setState({queuePos: pos});

        })

    }

    setDeviceId(device_id){
      this.setState({deviceId: device_id});
    }

    syncMusicToRoom(){
      this.socket.emit('init_player', this.info.id);
    }

    addRandomSong() {
      //when the song info parameter is left blank, adds a random song
      this.socket.emit('add_song', this.props.access_token, this.info.id);
    }

    addSong(song_info, position) {
      //when the song info parameter is left blank, adds a random song
      this.socket.emit('add_song', this.props.access_token, this.info.id, song_info, position);
    }

    moveToNext(position) {
      //when the song info parameter is left blank, adds a random song
      this.socket.emit('move_to_next', this.props.access_token, this.info.id, position);
    }

    deleteSong(position) {
      //when the song info parameter is left blank, adds a random song
      this.socket.emit('delete_song', this.props.access_token, this.info.id, position);
    }

    playSong(song_uri, queuePos) {
    //Sends device ID and Access token to backend to play music
    //through socket

    //Check if is loungemaster
      if (this.info.loungeMasterID === this.props.userInfo.id)
      {
        //Toggle play for everyone else
        this.socket.emit( 'play_song',
                          song_uri,
                          this.info.id,
                          queuePos);
      }

    }

    togglePlay(isPlaying) {

      //Check if is loungemaster
      if (this.info.loungeMasterID === this.props.userInfo.id)
      {
        //Toggle play for everyone else
        this.socket.emit('toggle_play', this.info.id, isPlaying);
      }

    }

    seekToNewPos(new_position) {
      //Check if is loungemaster
      if (this.info.loungeMasterID === this.props.userInfo.id)
      {
        //Toggle play for everyone else
        this.socket.emit('force_seek', this.info.id, new_position);
      }
      //Toggle play for everyone else
    }

    componentWillMount(){
      this.socket.emit('user_connected', this.props.access_token, this.info.id, this.props.userInfo);
    }
    render() {

            return (
                <div className="lounge">

                    <div className="loungeContainer">
                        <Queue  socket={this.socket}
                                playSong={this.playSong}
                                deleteSong = {this.deleteSong}
                                moveToNext = {this.moveToNext}
                                queueList={this.state.queueList}
                                queuePos = {this.state.queuePos}
                                isLM = {this.info.loungeMasterID === this.props.userInfo.id ? true : false}
                                />
                        <Chat socket={this.socket}
                              loungeInfo={this.info}
                              messages={this.state.messages}/>
                        <UserList users={this.state.users}
                                  loungeInfo={this.info}
                                  socket={this.socket}/>
                    </div>
                    <Player access_token={this.props.access_token}
                            socket={this.socket}
                            handleHome={this.props.handleHome}
                            setDeviceId={this.setDeviceId}
                            syncMusicToRoom={this.syncMusicToRoom}
                            playSong={this.playSong}
                            togglePlay={this.togglePlay}
                            addRandomSong={this.addRandomSong}
                            addSong={this.addSong}
                            seekToNewPos={this.seekToNewPos}
                            queueList={this.state.queueList}
                            queuePos = {this.state.queuePos}
                            isLM = {this.info.loungeMasterID === this.props.userInfo.id ? true : false}
                            />

                </div>
            )
        }

    componentWillUnmount(){
      this.socket.emit('user_disconnected', this.info.id);
    }
}

export default Lounge;
