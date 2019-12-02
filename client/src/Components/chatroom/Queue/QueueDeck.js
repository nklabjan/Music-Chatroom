import React, {Component} from "react";
import { Table } from 'react-bootstrap';
//import Song from './Song';
import QueueCard from './QueueCard';

import '../../../css/chatroom/Queue.css';
//import SongList from './SongList';

//let songList = new SongList();

class QueueDeck extends Component {
    // constructor() {
    //   super();
    // }
    //
    // getSongs() {
    //   let songs = songList.getList();
    //   let queue = [];
    //
    //   for(var i = 0; i < songs.length; i++) {
    //     queue.push(
    //       <Song uri={songs[i]} access_token={this.props.access_token}/>
    //     )
    //   }
    //   if(Object.entries(queue).length !== 0) {
    //     return queue;
    //   }
    // }

    render() {
      if (this.props.queueList.length > 0 && this.props.queueList !== undefined)
      {
        return (
                <div className="QueueDeck">
                    <div className="QueueDeckTitle">Queue</div>
                    <div className="QueueList">
                      <Table striped hover borderless className="queueTable" >
                        <thead>
                          <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                                this.props.queueList.map((song, songIndex) => {
                                  return (
                                      <QueueCard
                                      key=    {songIndex}
                                      passed_key= {songIndex}
                                      title=  {song["title"]}
                                      artist= {song["artist"]}
                                      album=  {song["album"]}
                                      socket={this.props.socket}
                                      playSong={this.props.playSong}
                                      uri=    {song["uri"]}
                                     />
                                )
                              })
                        }
                        </tbody>
                      </Table>
                      </div>
                </div>
        )
      }
      else {
        return (
          <div className="QueueDeck">
              <div className="QueueDeckTitle">Queue</div>
              <div className="QueueList">
                There are currently no songs in the queue.
              </div>
          </div>
        )
      }

    }
}

export default QueueDeck;
