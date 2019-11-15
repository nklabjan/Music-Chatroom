import React, {Component} from "react";
import '../../../css/chatroom/Queue.css'
import QueueDeck from './QueueDeck';

class Queue extends Component {

    render() {
        return (
                <div className="queue">
<<<<<<< HEAD
                    <QueueDeck socket={this.socket}
                               access_token={this.props.access_token}/>
=======
                    <QueueDeck socket={this.socket} playSong={this.props.playSong}/>
>>>>>>> 47ecd5d1eb6aaec42f92df4caebdcd1bb05cf768
                </div>
        )
    }
}

export default Queue;
