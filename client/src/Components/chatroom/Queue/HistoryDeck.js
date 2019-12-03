import React, {Component} from "react";
import { Table } from 'react-bootstrap';
//import Song from './Song';
import QueueCard from './QueueCard';

import '../../../css/chatroom/Queue.css';
//import SongList from './SongList';

//let songList = new SongList();

class HistoryDeck extends Component {
  
    render() {
      if (this.props.queueList.length > 0 &&
          this.props.queueList !== undefined &&
          this.props.queuePos > 0)
      {
        return (
                <div className="QueueDeck">
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
                                  //only render songs that are after the position
                                  if (songIndex < this.props.queuePos)
                                  {
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
                                  }
                                  else return null;
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
              <div className="QueueList">
                No songs have been played in this lounge yet.
              </div>
          </div>
        )
      }

    }
}

export default HistoryDeck;
