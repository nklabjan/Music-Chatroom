import React, {Component} from "react";
import '../css/Lounge.css';
import MusicPlayer from './MusicPlayer';
import Chat from './Chat';
import Queue from './Queue';
import UserList from './UserList';
import App from '../homepage/App'

class Lounge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false
        }
    }

    leaveChat() {
        this.setState({leaveChat: true});
    }

    render() {
        console.log(this.props.playerInfo)
        if(this.state.leaveChat === false) {
            return (
                <>
                    <header class="chatroom-header">
                        <button class="profile-chatroom">View/Edit Your Profile</button>
                        <div class="title"><b>CHATROOM</b></div>
                        <button class="leave-chatroom" onClick={this.leaveChat.bind(this)}>Leave Chatroom</button>
                    </header>
                    <div class="container">
                        <Queue />
                        <Chat />
                        <UserList />
                    </div>
                </>
            )
        }
        else {
            return (<App />)
        }
    }
}

export default Lounge;
