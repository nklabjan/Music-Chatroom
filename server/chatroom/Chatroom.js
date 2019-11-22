var LoungeQueue = require('../chatroom/LoungeQueue.js')


class Chatroom {
    constructor(io, id, loungeInfo, songList) {
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
        this.currentSong = null;
        this.queue = new LoungeQueue.LoungeQueue(this.io); //Queue of songs

        //If there are songs preloaded into the Chatroom -> load them into the queue
        if (songList !== undefined)
        {
          this.queue.loadSongs(songList);
        }
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

        //Load current messages into the Lounge for new user
        for (var msgBlob of this.messageList) {
            //this.io.emit("message_received", msgPayload['msg'], msgPayload['user']);
            socket.emit("message_received", msgBlob);
        }

        //Load current songs into the Lounge for new user
        this.getQueue(socket);

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

    playSong(accessToken, deviceId, spotifyURI, queuePos)
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

      this.io.to(this.id).emit("play_song", spotifyURI);
      //If song is in Chatroom queue, remove it from queue
      console.log(queuePos);
      if (queuePos !== undefined)
      {
        this.queue.playSong(queuePos);
        //update queue for everyone
        this.io.to(this.id).emit("queue_received", this.queue.songs);
        console.log(this.queue.songs);

      }

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
        console.log("message received")
        var msgBlob = { 'userName': this.users[socket.id].display_name,
                        'userID': this.users[socket.id].id,
                        'msg' : message }
        this.messageList.push(msgBlob);
        this.io.to(this.id).emit("message_received",  msgBlob);
    }

    getQueue(socket) {
        //Send the list back to the Client
        var queueList = this.queue.songs;
        socket.emit("queue_received", queueList);
    }

    //user this function to get limited info on the chatroom
    minimalInfo() {
      //return id, loungeMaster, numUsers, currSong, description
      var info = {id: this.id,
                  name: this.name,
                  loungeMasterName: this.loungeMasterName,
                  loungeMasterID: this.loungeMasterID,
                  numUsers: Object.keys(this.users).length,
                  currSong: this.currSong,
                  genres: this.genres,
                  desc: this.desc};
      return info;
    }
}

module.exports.Chatroom = Chatroom;
