import React, {Component} from "react";
import '../css/Lounge.css'

class Chat extends Component {

    sendMessage() {

    }

    render() {
        return (
            <>
                <div className="chatDisplay">
                    <div className="text">
                        <div className="inputMessage">
                        </div>
                        <button className="sendMessage" onClick={this.sendMessage.bind(this)}>Send</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Chat;