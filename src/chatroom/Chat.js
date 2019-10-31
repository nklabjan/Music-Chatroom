import React, {Component, Row} from "react";
import '../css/Lounge.css'
import io from "socket.io-client"

class Chat extends Component {
  constructor(props) {
      super(props);
      this.state = {
        messages: [] //format {user,msg} can add timestamp in the future
      }
      this.socket = io('localhost:8080');
      this.socket.on('message_received', function(msg, user) {

          var message_div = document.createElement("div");
          message_div.class = "text";
          var new_message = document.createElement("p");
          new_message.innerHTML = user + ": " + msg;
          message_div.appendChild(new_message);
          document.getElementById('chatdisplay').appendChild(message_div);
      })

  }

    
    sendMessage()
    {
        this.socket.emit('message_sent', document.getElementById('textarea').value, this.getAuthToken());
    }
    getAuthToken() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get('access_token');
    }

    render() {
        return (
                <>
                <div className="chatDisplay">
                <div className="messageArea" id="chatdisplay">
                </div>
                <div className="text">
                        <div className="inputMessage">
                            <textarea className="textarea" id="textarea">
                            </textarea>
                        </div>
                <button className="sendMessage" onClick={this.sendMessage.bind(this)}>Send</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Chat;
