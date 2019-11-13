import React, {Component} from "react";
import ChatBubble from './ChatBubble';
import '../../../css/chatroom/chat/ChatWindow.css'

class ChatWindow extends Component {

  constructor(props) {
      super(props);
      this.state = {
        messages: [] //format {user,msg} can add timestamp in the future
      }

  }

    render() {
      if (this.props.messages !== null && this.props.messages !== undefined && this.props.messages.length >0 ) {
            return (<div className="chatWindow">
              {
                      this.props.messages.map((msg, msgIndex) => {
                        return (
                            <ChatBubble
                            key={msgIndex}
                            user= {msg["user"]}
                            message={msg["message"]}
                           />
                      )
                    })
              }
                </div>
              )
            }
            else {
              return (<div className="chatWindow">

            </div>)
            }
    }
}

export default ChatWindow;
