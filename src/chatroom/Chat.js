import React, {Component} from "react";
import '../css/Lounge.css'

class Chat extends Component {

    sendMessage() {

    }

    render() {
        return (
            <>
                <div class="chatDisplay">
                    <div class="text">
                        <div class="inputMessage">
                        </div>
                        <button class="sendMessage" onClick={this.sendMessage.bind(this)}>Send</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Chat;