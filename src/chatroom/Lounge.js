import React, {Component} from "react";
import '../css/Lounge.css';
import Player from './Player/Player';
import Chat from './Chat';
import Queue from './Queue';
import UserList from './UserList';
import App from '../homepage/App';
import Button from 'react-bootstrap/Button';

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
                        <div className="title"><b>CHATROOM</b></div>
                        <button className="leave-chatroom" onClick={this.leaveChat.bind(this)}>Leave Chatroom</button>
                    </header>
                    <div className="container">
                        <Queue />
                        <Chat />
                        <UserList />
                    </div>
                        <Player access_token={this.props.access_token}/>
                </>
            )
        }
        else {
            return (<App />)
        }
    }
}

export default Lounge;
