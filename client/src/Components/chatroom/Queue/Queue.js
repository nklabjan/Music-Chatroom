import React, {Component} from "react";
import '../../../css/chatroom/Queue.css'
import QueueDeck from './QueueDeck';

class Queue extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
                <div className="queue">
                    <QueueDeck socket={this.socket}/>
                </div>
        )
    }
}

export default Queue;
