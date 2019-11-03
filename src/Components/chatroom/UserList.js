import React, {Component} from "react";
import '../../css/chatroom/UserList.css';

class UserList extends Component {

    constructor(props){
        super(props);
        
    }


    render() {
        return (
            <div className="userList">
                <div className="userListTitle"><b>Chatroom Members</b></div>
            </div>
        )
    }
}

export default UserList;
