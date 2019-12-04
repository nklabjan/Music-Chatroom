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
        this.loungeMasterAT = loungeInfo.access_token; //important to track where loungemaster music is at
        this.desc = loungeInfo.desc;
        this.genres = loungeInfo.genres;
        this.users = {};
        this.messageList = [];
        this.queue = new LoungeQueue.LoungeQueue(this.io); //Queue of songs
        this.password = null;

        //If there are songs preloaded into the Chatroom -> load them into the queue
        if (songList !== undefined)
        {
          this.queue.loadSongs(songList);
        }
    }

    loadMockQueue() {
      var mockQueue = [{uri:"spotify:track:2cbWaw8K4fKvR9kgBg3ugq"}];
    }

    //This method helps users in the chatroom to get the current song
    //Using the Loungemaster access token stored on the server side
    getCurrentSong(socket) {
      //if loungeMaster AT is null, then just play super rich kids with timestamp
      if (this.loungeMasterAT === null)
      {
        var def_song = this.queue.songs[this.queue.position];
        socket.emit("play_song", def_song.uri);

        //socket.emit("play_song", def_song, def_timestamp);
      }
      //Check and see the current timestamp of the lounge master and sync the music to
      //where the loungemaster has it at
      else if (this.users[socket.id] !== undefined)
      {
        //check if user is lounge master or not
        if (this.users[socket.id].id === this.loungeMasterID)
        {
          console.log("yes i am the loungemaster")
          if (this.queue.songs.length > 0)
          {
            var def_song = this.queue.songs[this.queue.position];
            socket.emit("play_song", def_song.uri);
          }
        }
        //sync to what the lounge master is listening
        else
        {
          //Get loungemaster's currently playing song with access oktne then
          //play the song with the progress ms for the currently joined user
          const options = {
            url: 'https://api.spotify.com/v1/me/player/currently-playing',
            headers: {
              "Authorization": `Bearer ${this.loungeMasterAT}`,
              "Content-Type": "application/json",
            },
            json: true

          };

          this.request.get(options, function(error, response, body) {
              //extract only relevant information from this
              //song uri, progress_ms, is_playing then call on play
              if (body != undefined)
              {

                var song_uri = body.item["uri"];
                var timestamp = body.progress_ms;

                //Play song for incoming user
                socket.emit("play_song", song_uri, timestamp);
              }
          })
        }
      }
    }

    addSong(access_token, song_info, position) {
      this.queue.addSong(song_info, position);
      var queueList = this.queue.songs;
      this.io.to(this.id).emit("queue_received",  queueList, this.queue.position);
      //if there is only 1 song in the queue, play the song immediately
      if (queueList.length === 1)
      {
        this.io.to(this.id).emit("play_song", song_info.uri);
      }
    }

    togglePlay() {
      //this.io.to(this.id).emit("queue_received",  queueList, this.queue.position);
      this.io.to(this.id).emit("toggle_play");

    }

    forceSeek(socket, newPosition) {
      //this.io.to(this.id).emit("queue_received",  queueList, this.queue.position);
      console.log("attempting to seek")
      this.io.to(this.id).emit("seek_to_position", newPosition);

    }

    addRandomSong(access_token) {
      // A list of all characters that can be chosen.
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      let chatroom = this;

      // Gets a random character from the characters string.
      const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
      let randomSearch = '';

      // Places the wildcard character at the beginning, or both beginning and end, randomly.
      switch (Math.round(Math.random())) {
        case 0:
          randomSearch = randomCharacter + '*';
          break;
        case 1:
          randomSearch = '*' + randomCharacter + '*';
          break;
      }
      const randomOffset = Math.floor(Math.random() * 10000);

      //Pick a random genre from loungeroom genres
      //var genre = this.genres[Math.floor(random(1,this.genres.length)) - 1];
      var query = 'https://api.spotify.com/v1/search/?q=' + randomSearch
                  + '&type=track&limit=1' + '&offset=' + randomOffset

      const options = {
        url: query,
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        json: true
      };

      this.request.get(options, function(error, response, body) {
        if (body)
        {
          //parse important info from body and play
          //add title, artist, album
          if (body.tracks)
          {
            var song = body.tracks.items[0]
            let title = song.name;
            let album = song.album.name;
            let artists = song.artists.map(artist => artist.name).join(", ");
            let uri = body.tracks.items[0].uri;

            let song_info = {title: title, album: album, artist: artists, uri: uri};

            chatroom.addSong(access_token, song_info, "end");
          }

        }
      })
    }

    userConnected(socket, accessToken, userInfo) {

        //New incoming connection
        if (this.users[socket.id] === undefined)
        {
            console.log("User " + userInfo.display_name + " connected to the lounge");
            var url;
            if (userInfo.images[0]) {
                url = userInfo.images[0].url;
            }
            else {
                url = null;
            }
          //Only keep important information
          var minimalUserInfo = { display_name: userInfo.display_name,
                                  id: userInfo.id,
                                  image: url,
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
        console.log(user.display_name)
        delete this.users[socket.id];
        socket.leave(this.id);
        console.log(this.users);
        console.log("Users left in lounge:" + Object.keys(this.users).length)
        //console.log(this.users)
        //Emit event to all other users to remove leaving user from list
        this.io.to(this.id).emit("user_disconnected", user);

      }
    }

    playSong(spotifyURI, queuePos)
    {
      var chatroom = this; // alias this as chatroom so it can be referenced in async call
      if (queuePos != undefined && queuePos != null)
      {
        console.log("Attempting to play " + spotifyURI)

        //Cause everyone else to play the same music
        this.io.to(this.id).emit("play_song", spotifyURI);
        //If song is in Chatroom queue, remove it from queue

        this.queue.playSong(queuePos);

        //update queue for everyone
        this.io.to(this.id).emit("queue_received", this.queue.songs, this.queue.position);

      }
      //This means that the song is not in the queue, so just add the song in and rearrange the queue
      //This also means that spotifyURI is actually a full song that needs to be added to the queue
      else if (!queuePos)
      {
        console.log(spotifyURI)
        //Make song next in line
        this.queue.addSong(spotifyURI, "start")
        //Play song
        console.log("position: " + this.queue.position)
        this.playSong(spotifyURI.uri, this.queue.position + 1)

      }
    }

    chatMessage(socket, message) {
        console.log("message received")
        if (this.users[socket.id] !== undefined)
        {
          var msgBlob = { 'userName': this.users[socket.id].display_name,
                          'userID': this.users[socket.id].id,
                          'msg' : message }
          this.messageList.push(msgBlob);
          this.io.to(this.id).emit("message_received",  msgBlob);
        }
    }

    getQueue(socket) {
        //Send the list back to the Client
        var queueList = this.queue.songs;
        socket.emit("queue_received", queueList, this.queue.position);
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
