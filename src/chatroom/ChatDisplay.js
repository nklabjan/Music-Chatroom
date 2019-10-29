import React, {Component} from "react";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');


class ChatDisplay extends Component {

    render() {
        return (
            <>
                <div class="centerElement display">
                    This is a placeholder for the chat display.
                </div>
            </>
        )
    }
}

export default ChatDisplay;
