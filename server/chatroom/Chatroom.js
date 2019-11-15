class Chatroom {
    constructor(io, id, loungeInfo) {
        this.request = require('request');
        this.io = io;
        this.id = id; //Chatroom unique ID
        // cache of sockets against user info
        this.name = loungeInfo.name;
        this.loungeMasterName = loungeInfo.loungeMasterName;
        this.loungeMasterID = loungeInfo.loungeMasterID;
        this.desc = loungeInfo.desc;
        this.genres = loungeInfo.genres;
        this.users = {};
        this.messageList = [];
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
            //console.log(chatroom.users[socket] !== undefined);
            // if this is a socket we haven't seen before, add it to the user list
            // and emit a join message to everyone else
            if (chatroom.users[socket.id] === undefined) {
                chatroom.users[socket.id] = body["display_name"];
                io.to(chatroom.id).emit("user_connected", body["display_name"]);

                //socket.broadcast.emit("user_connected", body["display_name"]);
            }
            // regardless, load the member list
            for(var userId in chatroom.users) {
              //console.log("it does this")
                //socket.emit("user_connected", chatroom.users[userId]);
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
      console.log("Users left in lounge:" + Object.keys(this.users).length)

    }

    playSong(accessToken, deviceId, spotifyURI)
    {
      var chatroom = this; // alias this as chatroom so it can be referenced in async call
      var io = this.io
      console.log("Attempting to play " + spotifyURI)
      const options = {
        url: 'https://api.spotify.com/v1/me/player/play?device_id=' + deviceId,
        body: JSON.stringify({ uris: [spotifyURI] }),
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      console.log(chatroom.id)
      this.io.to(this.id).emit("play_song", spotifyURI);

      this.request.put(options, function(error, response, body) {
          // song_uri = body.display_name;
          // body=JSON.parse(body);
          //console.log(response.body);
          //console.log(body);
          //have everyone play this song on their devices too
          //io.to(chatroom.id).emit("play_song", spotifyURI);

      })
    }

    chatMessage(socket, message) {
        this.messageList.push({'user': this.users[socket.id], 'msg' : message });
        this.io.to(this.id).emit("message_received", message, this.users[socket.id]);
        console.log(this.id)
    }

    //user this function to get limited info on the chatroom
    minimalInfo() {
      //return id, loungeMaster, numUsers, currSong, description
      var info = {id: this.id,
                  name: this.name,
                  loungeMasterName: this.loungeMasterName,
                  numUsers: Object.keys(this.users).length,
                  currSong: this.currSong,
                  genres: this.genres,
                  desc: this.desc};
      return info;
    }
}

module.exports.Chatroom = Chatroom;
