import React, {Component} from "react";
import '../../css/chatroom/UserList.css';
import {Image, Overlay} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import default_pic from '../../images/anonymous.png';
import UserInfoPopover from './UserInfoPopover';

class UserListMember extends Component {
  constructor(props) {
    super(props);
    this.renderCrown = this.renderCrown.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.state = {
      showInfo: false
      }
    this.member = null;

    this.setMember = element => {
        this.member = element;
      };
    }

    //Gets passed user information to display
    //Maybe onHover/ onClick shows extra user information
    //Shows picture and username
    toggleShow(){
      this.setState({showInfo: !this.state.showInfo})
    }

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
            <div  className="userListMember"
                  ref={this.setMember}
                  key={this.props.passed_key}
                  onClick= {() => this.toggleShow()}>
            <div className="userPicContainer">
                <Image  src={this.props.user.image !== null ? this.props.user.image : default_pic}
                        roundedCircle
                        className="userListDP"/>
                {this.renderCrown()}
            </div>
            <div className="userListName">
            {this.props.user.display_name}
            </div>
            <Overlay  target={this.member}
                      show={this.state.showInfo}
                      placement="left">
              {props => (
                <UserInfoPopover  {...props}
                                  user= {this.props.user}
                                  isLM = {this.props.isLM}
                                  />
              )}
            </Overlay>
            </div>
        )
    }
}

export default UserListMember;
