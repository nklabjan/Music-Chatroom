import React, {Component} from "react";
import ReactDOM from 'react-dom';
import '../css/Lounge.css';
import ChatDisplay from './ChatDisplay';
import ChatBar from './ChatBar';
import Queue from './Queue';
import UserList from './UserList';
import App from '../homepage/App';

class Lounge extends Component {

    leaveChat() {

    }

    render() {
        return (
            <>
                <header class="chatroom-header">
                    <button class="profile-chatroom">View/Edit Your Profile</button>
                    <button class="leave-chatroom" onClick={this.leaveChat.bind(this)}>Leave Chatroom</button>
                </header>
                <div class="container">
                    <Queue />
                    <ChatDisplay />
                    <UserList />
                    <div class="chatBarItem">
                        <ChatBar />
                        </div>
                </div>                 
            </>
        )
    }
}

export default Lounge;