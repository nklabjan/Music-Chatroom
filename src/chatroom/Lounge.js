import React, {Component} from "react";
import '../css/Lounge.css';
import ChatDisplay from './ChatDisplay';
import ChatBar from './ChatBar';
//import Player from './Player';
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
                    <header className="chatroom-header">
                        <button className="profile-chatroom">View/Edit Your Profile</button>
                        <button className="leave-chatroom" onClick={this.leaveChat.bind(this)}>Leave Chatroom</button>
                    </header>
                    <div className="container">
                        <Queue />
                        <ChatDisplay />
                        <UserList />
                        <div className="chatBarItem">
                            <ChatBar />
                            </div>
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
