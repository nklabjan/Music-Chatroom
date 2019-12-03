import React, {Component} from "react";
import '../../../css/chatroom/Queue.css'
import QueueDeck from './QueueDeck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

class Queue extends Component {

    render() {
        return (
                <div className="queue">
                <div className="QueueDeckHeader">
                  <div className="QueueDeckHeader-Part"></div>
                  <div className="QueueDeckTitle">Queue</div>
                  <div className="QueueDeckHeader-Part">
                    <button className="history-btn" onClick={()=>{console.log("poop")}}>
                      <FontAwesomeIcon icon={ faHistory } />
                    </button>
                  </div>

                </div>
                    <QueueDeck  socket={this.socket}
                                playSong={this.props.playSong}
                                queueList={this.props.queueList}
                                queuePos={this.props.queuePos}/>
                </div>
        )
    }
}

export default Queue;
