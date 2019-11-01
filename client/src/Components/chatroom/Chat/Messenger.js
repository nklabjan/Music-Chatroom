import React, {Component} from "react";
import '../../../css/chatroom/chat/Messenger.css';

class Messenger extends Component {

    onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            this.props.sendMessage();
        }
    }
    
    render() {
        return (
          <div className="messenger">
              <textarea className="textarea" id="textarea" onKeyDown={this.onEnterPress}></textarea>
              <button className="sendMessage" onClick={this.props.sendMessage}>Send</button>
          </div>
        )
    }
}

export default Messenger;
