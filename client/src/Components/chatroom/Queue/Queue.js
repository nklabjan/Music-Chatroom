import React, {Component} from "react";
import ReactCardFlip from 'react-card-flip';
import '../../../css/chatroom/Queue.css'
import QueueDeck from './QueueDeck';
import HistoryDeck from './HistoryDeck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

class Queue extends Component {
    constructor() {
      super();
        this.state = {
        isFlipped: false
      };
      this.handleClick = this.handleClick.bind(this);
      this.renderDeck = this.renderDeck.bind(this);
    }

    handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
    renderDeck() {
      return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
        <QueueDeck  socket={this.socket}
                    playSong={this.props.playSong}
                    queueList={this.props.queueList}
                    queuePos={this.props.queuePos}/>

        <HistoryDeck  socket={this.socket}
                      playSong={this.props.playSong}
                      queueList={this.props.queueList}
                      queuePos={this.props.queuePos}/>
      </ReactCardFlip>
    )

    }

    render() {
        return (
                <div className="queue">
                <div className="QueueDeckHeader">
                  <div className="QueueDeckHeader-Part"></div>
                  <div className="QueueDeckTitle">{!this.state.isFlipped ? "Queue" : "History"}</div>
                  <div className="QueueDeckHeader-Part">
                    <button className="history-btn" onClick={this.handleClick}>
                      <FontAwesomeIcon icon={ faHistory } />
                    </button>
                  </div>

                </div>
                    {this.renderDeck()}
                </div>
        )
    }
}

export default Queue;
