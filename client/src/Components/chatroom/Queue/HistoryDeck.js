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
        var historyList = this.props.queueList.slice(0, this.props.queuePos);
        historyList.reverse();

        return (
                <div className="QueueDeck">

                    <div className="QueueList">
                        {
                                historyList.map((song, songIndex) => {
                                  //only render songs that are after the position

                                    return (
                                        <QueueCard
                                        key=    {this.props.queuePos - (songIndex + 1)}
                                        passed_key= {this.props.queuePos - (songIndex + 1)}
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
