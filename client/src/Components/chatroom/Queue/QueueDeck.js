import React, {Component} from "react";
import QueueCard from './QueueCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import '../../../css/chatroom/Queue.css';


class QueueDeck extends Component {

    render() {
      if (this.props.queueList.length > 0 &&
          this.props.queueList !== undefined &&
          this.props.queuePos < this.props.queueList.length - 1)
      {
        return (
                <div className="QueueDeck">

                    <div className="QueueList">
                        {
                                this.props.queueList.map((song, songIndex) => {
                                  //only render songs that are after the position
                                  if (songIndex > this.props.queuePos)
                                  {
                                    return (
                                        <QueueCard
                                        key=    {songIndex}
                                        passed_key= {songIndex}
                                        song = {song}
                                        socket={this.props.socket}
                                        playSong={this.props.playSong}
                                        deleteSong = {this.props.deleteSong}
                                        moveToNext = {this.props.moveToNext}
                                        isLM = {this.props.isLM}
                                       />
                                     )
                                  }
                                  else return null;
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
                There are currently no songs in the queue.
                <div>Click on <FontAwesomeIcon icon= {faPlusCircle} /> to add a song!</div>
              </div>
          </div>
        )
      }

    }
}

export default QueueDeck;
