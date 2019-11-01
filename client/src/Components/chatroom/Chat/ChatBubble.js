import React, {Component} from "react";
import '../../../css/chatroom/chat/ChatBubble.css';

class ChatBubble extends Component {

    render() {
        return (<div className="chatBubble">
            {this.props.user} : {this.props.message}
          </div>
        )
    }
}

export default ChatBubble;
