import React, {Component} from "react";
import '../css/Lounge.css'

const io = require('socket.io-client');
const socket = io.connect('http://localhost:8080');
socket.on('message_sent', function(msg) {
    var message_tank = document.createElement("div");
    var new_message = document.createElement("p");
    new_message.innerHTML = msg;
    message_tank.appendChild(new_message);
    message_tank.appendChild(document.createElement("br"));
    document.getElementById('chatdisplay').appendChild(message_tank);
});

/*socket.on('connection' function() {

});*/

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [] //format {user,msg} can add timestamp in the future
        }
    }

    sendMessage(){
        console.log(socket);
        socket.emit('message_sent', document.getElementById('textarea').value);
    }

    render() {
        return (
            <>
                <div className="chatDisplay">
                    <div className="text" id="chatdisplay">
                        <textarea className="textarea" id="textarea"></textarea>      
                        <button className="sendMessage" onClick={this.sendMessage.bind(this)}>Send</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Chat;
