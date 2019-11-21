import React, {Component} from "react";
import '../../../css/chatroom/chat/ChatBubble.css';

class ChatBubble extends Component {

    render() {
        return (<div className="chatBubble">
                  <div className="chatName">
                    {this.props.user}
                  </div>
                  <div className="chatMessage">
                    {this.props.message}
                  </div>
          </div>
        )
    }
}

export default ChatBubble;
