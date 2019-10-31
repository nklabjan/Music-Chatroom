import React, {Component} from "react";
import '../../css/Lounge.css';
import Player from './Player/Player';
import Chat from './Chat';
import Queue from './Queue';
import UserList from './UserList';

class Lounge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
            displayProfile: false
        }
    }

    render() {
        console.log(this.props.playerInfo)

            return (
                <div className="lounge">
                    <header className="chatroom-header">
                        <button className="profile-chatroom" onClick={this.props.handleProfile}>View/Edit Your Profile</button>
                        <span className="title"><b>CHATROOM</b></span>
                        <button className="leave-chatroom" onClick={this.props.handleHome}>Leave Chatroom</button>
                    </header>

                    <div className="loungeContainer">
                        <Queue />
                        <Chat />
                        <UserList />
                    </div>
                    <Player access_token={this.props.access_token}/>

                </div>
            )
        }

}

export default Lounge;
