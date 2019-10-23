import React, {Component} from "react";
import '../css/Lounge.css';
import ChatDisplay from './ChatDisplay';
import ChatBar from './ChatBar';
import Queue from './Queue';
import UserList from './UserList';

class Lounge extends Component {

    render() {
        return (
            <>
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