import React, {Component} from "react";
import '../../css/chatroom/UserList.css';
import {Image} from 'react-bootstrap';

class UserListMember extends Component {

    //Gets passed user information to display
    //Maybe onHover/ onClick shows extra user information
    //Shows picture and username
    render() {
        return (
            <div className="userListMember" key={this.props.passed_key}>
                <Image src={this.props.image} roundedCircle className="userListDP"/>
                <div className="userListName">
                <a  href={this.props.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="userNameLink">{this.props.name}</a>
                </div>
            </div>
        )
    }
}

export default UserListMember;
