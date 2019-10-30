import React, {Component} from "react";
import '../css/Lounge.css';
import Player from './Player/Player';
import Chat from './Chat';
import Queue from './Queue';
import UserList from './UserList';
import App from '../homepage/App';
import Profile from "../profile/Profile";

class Lounge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
            displayProfile: false
        }
    }

    leaveChat() {
        this.setState({leaveChat: true});
    }

    handleProfile() {
        this.setState({displayProfile: true})
    }

    render() {
        console.log(this.props.playerInfo)
        if(this.state.leaveChat === false && this.state.displayProfile === false) {
            return (
                <>
                    <header className="chatroom-header">
                        <button className="profile-chatroom" onClick={this.handleProfile.bind(this)}>View/Edit Your Profile</button>
                        <span className="title"><b>CHATROOM</b></span>
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
        else if (this.state.leaveChat === true) {
            return (<App />)
        }

        else if (this.state.displayProfile === true) {
            return <div>
                        <Profile access_token={this.state.access_token}/>
                    </div>;
        }
    }
}

export default Lounge;
