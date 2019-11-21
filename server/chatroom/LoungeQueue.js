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

      this.history = []; //No rearranging the history of songs that have been played
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
        this.songs.unshift(songInfo);
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
      let played_song = this.songs.splice(position, 1);

      //return the song information to be played by the player
      this.history.push(played_song);
      return played_song;
    }

    removeSong(position) {
      let removed_song = this.songs.splice(position, 1);

      //return the song information to be played by the player
      return removed_song;
    }


}

module.exports.LoungeQueue = LoungeQueue;
