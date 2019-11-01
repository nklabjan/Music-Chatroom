import React, {Component} from "react";
import '../../../css/chatroom/chat/Messenger.css';

class Messenger extends Component {

    render() {
        return (
          <div className="messenger">
              <textarea className="textarea" id="textarea"></textarea>
              <button className="sendMessage" onClick={this.props.sendMessage}>Send</button>
          </div>
        )
    }
}

export default Messenger;
