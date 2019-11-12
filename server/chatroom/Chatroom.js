class Chatroom {
    constructor(io) {
        this.request = require('request');
        this.io = io;
        // cache of sockets against user info
        this.users = {};
        this.messageList = [];
        this.queue = []; //Queue of songs
        this.history = [];
        this.loungeMaster = null;
    }

    loadMockQueue() {
      var mockQueue = [{uri:"spotify:track:2cbWaw8K4fKvR9kgBg3ugq"}];
    }
    
    userConnected(socket, accessToken) {
        // when a new user connects, get profile information
        console.log(socket.id);
        var url = 'https://api.spotify.com/v1/me?access_token=' +accessToken;
        var chatroom = this; // alias this as chatroom so it can be referenced in async call
        var io = this.io;
        this.request(url, function(error, response, body) {
            body = JSON.parse(body);
            console.log(chatroom.users[socket] !== undefined);
            // if this is a socket we haven't seen before, add it to the user list
            // and emit a join message to everyone else
            if (chatroom.users[socket.id] === undefined) {
                chatroom.users[socket.id] = body["display_name"];
                socket.broadcast.emit("user_connected", body["display_name"]);
            }
            // regardless, load the member list
            for(var userId in chatroom.users) {
                socket.emit("user_connected", chatroom.users[userId]);
            }

        })

        for (var indx in this.messageList) {
            var msgPayload = this.messageList[indx];
            //this.io.emit("message_received", msgPayload['msg'], msgPayload['user']);
            socket.emit("message_received", msgPayload['msg'], msgPayload['user']);
        }


    }


    playSong(accessToken, deviceId, spotifyURI)
    {
        const options = {
        url: 'https://api.spotify.com/v1/me/player/play?device_id=' + deviceId,
        body: JSON.stringify({ uris: [spotifyURI] }),
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

          this.request.put(options, function(error, response, body) {
              // song_uri = body.display_name;
              // body=JSON.parse(body);
              // io.emit("play_song", message, body["display_name"]);
              console.log("Playing lost kings")
          })

    }

    chatMessage(socket, message) {
        this.messageList.push({'user': this.users[socket.id], 'msg' : message });
        this.io.emit("message_received", message, this.users[socket.id]);
    }
}

module.exports.Chatroom = Chatroom;
