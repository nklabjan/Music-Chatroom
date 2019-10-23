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
                <div className="top">
                    this is the top div
                </div>
                <div className="middle">
                    this is the middle div
                </div>
                <div className="bottom">
                    this is the bottom div
                </div>
            </>
        )
    }
}

export default Lounge;