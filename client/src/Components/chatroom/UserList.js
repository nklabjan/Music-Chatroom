import React, {Component} from "react";
import UserListMember from './UserListMember';

import '../../css/chatroom/UserList.css';

class UserList extends Component {


    render() {
      if (this.props.users.length > 0 && this.props.users !== undefined)
      {
        return(
            <div className="userList">
                <div className="userListTitle">Chatroom Members</div>
                <div className="members">
                  {this.props.users.map((user, idx) => {
                    var isLM = null;
                    if (user.id === this.props.loungeInfo.loungeMasterID)
                    {
                      isLM = true;
                    }
                    else
                    {
                      isLM = false;
                    }
                    return(<UserListMember  key={idx}
                                            passed_key ={idx}
                                            user = {user}
                                            isLM = {isLM}
                                            socket={this.props.socket}
                                      />)
                  })}
                </div>
            </div>)
      }
      else
      {
        return(
            <div>
              There are no users in the room.
            </div>
        )
      }
    }
}

export default UserList;
