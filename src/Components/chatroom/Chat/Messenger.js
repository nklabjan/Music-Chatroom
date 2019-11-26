import React, {Component} from "react";
import '../../../css/chatroom/chat/Messenger.css';
import {Button} from 'react-bootstrap';

class Messenger extends Component {

    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.sendValidMessage();

        }
    }

    handleClick = () => {
        this.sendValidMessage();
    }

    sendValidMessage() {
      var msg = document.getElementsByClassName('textarea')[0].value;
      if (msg.length > 0 && msg.trim().length > 0)
      {
        this.props.sendMessage();
        this.clearForm();
      }
    }

    clearForm() {
        document.getElementsByClassName('textarea')[0].value = "";
    }

    render() {
        return (
          <div className="messenger">
            <div className="textarea_container">
              <textarea className="textarea" id="textarea" onKeyDown={this.onEnterPress}></textarea>
            </div>
            <div className="sendMsgBtnContainer">
              <Button className="sendMessage" onClick={this.handleClick}>Send</Button>
            </div>
          </div>
        )
    }
}

export default Messenger;
