import React, {Component} from "react";
import ChatBubble from './ChatBubble';
import '../../../css/chatroom/chat/ChatWindow.css'

class ChatWindow extends Component {

    render() {
      if (this.props.messages !== null &&
          this.props.messages !== undefined &&
          this.props.messages.length >0 ) {
            return (<div className="chatWindow">
              {
                      this.props.messages.map((msgBlob, msgIndex) => {
                        console.log(msgBlob);
                        return (
                            <ChatBubble
                            key={msgIndex}
                            user= {msgBlob["userName"]}
                            message={msgBlob["msg"]}
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
