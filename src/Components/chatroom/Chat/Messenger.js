import React, {Component} from "react";
import '../../../css/chatroom/chat/Messenger.css';

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
              <button className="sendMessage" onClick={this.handleClick}>Send</button>
          </div>
        )
    }
}

export default Messenger;
