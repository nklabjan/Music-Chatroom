import React, {Component} from "react";
import '../../../css/chatroom/chat/Messenger.css';
import {Button} from 'react-bootstrap';

class Messenger extends Component {

    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.props.sendMessage();
            this.clearForm();
        }
    }

    handleClick = () => {
        this.props.sendMessage();
        this.clearForm();
    }

    clearForm() {
        document.getElementsByClassName('textarea')[0].value = "";
    }

    render() {
        return (
          <div className="messenger">
              <textarea className="textarea" id="textarea" onKeyDown={this.onEnterPress}></textarea>
              <Button className="sendMessage" onClick={this.handleClick}>Send</Button>
          </div>
        )
    }
}

export default Messenger;
