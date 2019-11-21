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

    userConnected(socket, accessToken, userInfo) {

        //New incoming connection
        if (this.users[socket.id] === undefined)
        {
          console.log("User " + userInfo.display_name + " connected to the lounge");
          //Only keep important information
          var minimalUserInfo = { display_name: userInfo.display_name,
                                  id: userInfo.id,
                                  image: userInfo.images[0].url,
                                  spotify_url: userInfo.external_urls.spotify,
                                  uri: userInfo.uri,
                                  country: userInfo.country,
          }

          this.users[socket.id] = minimalUserInfo;
          //for current user give the entire user list
          for (var key in this.users)
          {
            socket.emit("user_connected", this.users[key]);
          }

          socket.to(this.id).emit("user_connected", minimalUserInfo);

        }
        else {
          console.log("User with connection already exist.")
        }
        // when a new user connects, get profile information
        // var url = 'https://api.spotify.com/v1/me?access_token=' +accessToken;
        // var chatroom = this; // alias this as chatroom so it can be referenced in async call
        // var io = this.io;
        //
        // this.request(url, function(error, response, body) {
        //     body = JSON.parse(body);
        //     //console.log(chatroom.users[socket] !== undefined);
        //     // if this is a socket we haven't seen before, add it to the user list
        //     // and emit a join message to everyone else
        //     if (chatroom.users[socket.id] === undefined) {
        //         chatroom.users[socket.id] = body["display_name"];
        //         io.to(chatroom.id).emit("user_connected", body["display_name"]);
        //
        //         //socket.broadcast.emit("user_connected", body["display_name"]);
        //     }
        //     // regardless, load the member list
        //     for(var userId in chatroom.users) {
        //         //socket.emit("user_connected", chatroom.users[userId]);
        //     }
        //
        // })

        for (var indx in this.messageList) {
            var msgPayload = this.messageList[indx];
            //this.io.emit("message_received", msgPayload['msg'], msgPayload['user']);
            socket.emit("message_received", msgPayload['msg'], msgPayload['user']);
        }

    }

    userDisconnected(socket)
    {
      if (this.users[socket.id])
      {
        var user = this.users[socket.id]
        console.log("user " + socket.id + " has disconnected.");
        delete this.users[socket.id];
        socket.leave(this.id);

        console.log("Users left in lounge:" + Object.keys(this.users).length)
        console.log(this.users)
        //Emit event to all other users to remove leaving user from list
        this.io.to(this.id).emit("user_disconnected", user);

      }
    }

    playSong(accessToken, deviceId, spotifyURI)
    {
      var chatroom = this; // alias this as chatroom so it can be referenced in async call
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
        this.messageList.push({'user': this.users[socket.id].display_name, 'msg' : message });
        this.io.to(this.id).emit("message_received", message, this.users[socket.id].display_name);
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
