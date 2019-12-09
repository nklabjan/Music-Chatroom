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
    this.requestAdditionalInfo = this.requestAdditionalInfo.bind(this);

    this.state = {
      showInfo: false,
      extraInfo: null
      }
    this.member = null;

    this.setMember = element => {
        this.member = element;
      };
    this.setUpSocket();
    }

    setUpSocket() {
        var userListMember = this;

        this.props.socket.on('receive_add_user_info', function(extraInfo) {
          //Checks if extra info belongs to this user member
          console.log(userListMember.props.user)
          if (extraInfo.id === userListMember.props.user.id)
          {
            //Receives extra info from database
            userListMember.setState({extraInfo: extraInfo});
            //Reopen popover
            setTimeout(function(){ userListMember.setState({showInfo: true})}, 200);
          }

        })

    }

    requestAdditionalInfo() {
      this.props.socket.emit('get_add_user_info', this.props.user.id);
      this.setState({showInfo: false});

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
                <div className="popoverWrapper">
                <UserInfoPopover  {...props}
                                  user= {this.props.user}
                                  isLM = {this.props.isLM}
                                  extraInfo = {this.state.extraInfo}
                                  requestAdditionalInfo = {this.requestAdditionalInfo}
                                  />
                </div>
              )}
            </Overlay>
            </div>
        )
    }
}

export default UserListMember;
