import React, {Component} from "react";

class ChatBubble extends Component {

    render() {
        return (<div className="chatBubble">
            {this.props.user} : {this.props.message}
          </div>
        )
    }
}

export default ChatBubble;
