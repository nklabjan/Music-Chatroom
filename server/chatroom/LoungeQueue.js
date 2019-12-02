class LoungeQueue {
  //The LoungeQueue keeps track of all the songs in the queue
  //and the history of songs that are being played

    constructor(io,songs) {
      //Theres preloaded music
      this.songs = []; //Holds all the queue song information including the song URI
      if (songs !== undefined)
      {
        this.songs = songs;
      }

      this.position = 0; //start at position 0
    }

    //Receives an array of songs to be added to the loungeQueue
    loadSongs(songs) {
      for (var song of songs)
      {
        this.addSong(song, "end");
      }
    }
    //Adds a song to the queue - could be at the front or the back
    //unshift for start of songs
    //push for end of songs
    addSong(songInfo, position) {
      if (position == "start")
      {
        //this.songs.unshift(songInfo);
        //Adds song to right after the currently playing song
        this.songs.splice( this.position + 1, 0, songInfo);
      }
      else if (position == "end")
      {
        this.songs.push(songInfo);
      }

      //Probably tries to update for everyone too
    }

    //Remove song from the song Queue if a song in the queue is played.
    //If a song from somewhere else is double-tapped, don't need to remove from queue.
    playSong(position) {
      let played_song = this.songs[position];
      //return the song information to be played by the player
      //Update to everyone in the room

      //if position - this.position > 1, splice from original pos and put
      //into new position right after this.position,
      //go next
      console.log(this.songs);
      if (position - this.position > 1)
      {
        this.songs.splice( position, 1);
        this.songs.splice( this.position + 1, 0 , played_song);
        this.next();
      }
      else if (position - this.position == 1)
      {
        this.next();
      }
      else if (position - this.position == -1)
      {
        this.prev();
      }

      return played_song;
    }

    removeSong(position) {
      let removed_song = this.songs.splice(position, 1);

      //return the song information to be played by the player
      return removed_song;
    }

    next(){
      if (this.position < this.songs.length)
      {
        this.position = this.position + 1;
      }
    }

    prev(){
      if (this.position > 0)
      {
        this.position = this.position - 1;
      }
    }

}

module.exports.LoungeQueue = LoungeQueue;
