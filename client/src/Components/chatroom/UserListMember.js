import React, {Component} from "react";
import '../../css/chatroom/UserList.css';
import {Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import default_pic from '../../images/anonymous.png';

class UserListMember extends Component {

    //Gets passed user information to display
    //Maybe onHover/ onClick shows extra user information
    //Shows picture and username
    renderCrown(){
      if (this.props.isLM)
      {
        return (
          <div className="thing"><FontAwesomeIcon icon={ faCrown } className="crownLM"/></div>
        )
      }
    }

    render() {
        return (
            <div className="userListMember" key={this.props.passed_key}>
            <div className="userPicContainer">
                <Image  src={this.props.image !== null ? this.props.image : default_pic} 
                        roundedCircle
                        className="userListDP"/>
                {this.renderCrown()}
            </div>
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
