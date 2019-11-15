import React, {Component} from "react";
import { Table } from 'react-bootstrap';
import Song from './Song';
import '../../../css/chatroom/Queue.css';
import SongList from './SongList';

let songList = new SongList();

class QueueDeck extends Component {
    constructor() {
      super();
    }

    getSongs() {
      let songs = songList.getList();
      let queue = [];

      for(var i = 0; i < songs.length; i++) {
        queue.push(
          <Song uri={songs[i]} access_token={this.props.access_token}/>
        )
      }
      if(Object.entries(queue).length !== 0) {
        return queue;
      }
    }
    
    render() {
        return(
          <div>
            {this.getSongs()}
          </div>
        )
    }
}

export default QueueDeck;
