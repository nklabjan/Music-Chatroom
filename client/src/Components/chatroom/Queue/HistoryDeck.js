import React, {Component} from "react";
import { Table } from 'react-bootstrap';
import QueueCard from './QueueCard';

import '../../../css/chatroom/Queue.css';


class HistoryDeck extends Component {

    render() {
      if (this.props.queueList.length > 0 &&
          this.props.queueList !== undefined &&
          this.props.queuePos > 0)
      {
        return (
                <div className="QueueDeck">

                    <div className="QueueList">
                        {
                                this.props.queueList.map((song, songIndex) => {
                                  //only render songs that are after the position

                                    return (
                                        <QueueCard
                                        key=    {songIndex}
                                        passed_key= {songIndex}
                                        song = {song}
                                        socket={this.props.socket}
                                        playSong={this.props.playSong}
                                        isLM = {this.props.isLM}
                                       />
                                     )

                              })
                        }
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
