import React, {Component} from "react";
import UserListMember from './UserListMember';
import {CardDeck} from 'react-bootstrap';

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
                    console.log(user.display_name)
                    return(<UserListMember key={idx}
                                      name={user.display_name}
                                      image={user.image}
                                      spotify_url={user.spotify_url}
                                      country={user.country}
                                      passed_key ={idx}
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
