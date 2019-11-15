class Chatroom {
    constructor(io, id, loungeMaster) {
        this.request = require('request');
        this.io = io;
        this.id = id; //Chatroom unique ID
        // cache of sockets against user info
        this.users = {};
        this.messageList = [];
        this.loungeMaster = loungeMaster;
        this.desc = "";

        this.queue = []; //Queue of songs
        this.currentSong = null;
        this.history = [];

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
                io.to(this.id).emit("user_connected", body["display_name"]);

                //socket.broadcast.emit("user_connected", body["display_name"]);
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

    userDisconnected(socket)
    {
      console.log("user " + socket.id + " has disconnected.");
      delete this.users[socket.id];
      for( var key in this.users ) {
          //var value = this.users[key];
        }
      console.log("Users left in lounge:" + Object.keys(this.users).length
)

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
        this.io.to(this.id).emit("message_received", message, this.users[socket.id]);
    }

    //user this function to get limited info on the chatroom
    minimalInfo() {
      //return id, loungeMaster, numUsers, currSong, description
      var info = {id: this.id,
                  loungeMaster: this.loungeMaster,
                  numUsers: Object.keys(this.users).length,
                  currSong: this.currSong,
                  desc: this.desc};
      return info;
    }
}

module.exports.Chatroom = Chatroom;
