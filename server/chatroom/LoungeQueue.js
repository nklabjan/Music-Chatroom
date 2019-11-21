class LoungeQueue {
  //The LoungeQueue keeps track of all the songs in the queue
  //and the history of songs that are being played

    constructor(io, id, loungeInfo) {
      this.songs = []; //Holds all the queue song information including the song URI
      this.history = []; //No rearranging the history of songs that have been played
    }

    //Adds a song to the queue - could be at the front or the back
    //unshift for start of songs
    addSong(songInfo, position) {

    }


}

module.exports.LoungeQueue = LoungeQueue;
