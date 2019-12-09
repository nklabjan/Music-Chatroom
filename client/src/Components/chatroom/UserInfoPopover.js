import React, {Component} from "react";
import '../../css/chatroom/UserList.css';
import {Popover} from 'react-bootstrap';


class UserInfoPopover extends Component {

    componentDidMount() {
      //check if extra info is null if not make a call to database
      if (this.props.extraInfo === null)
      {
        this.props.requestAdditionalInfo();
      }
    }

    renderUserInfo() {
      if (this.props.extraInfo === null)
      return (
        <div className="userInfo">
          No info to be displayed.
        </div>
      )
      //This means that we got additional info from the database
      else {
        return (
          <div className="userInfo">
            <div className="userInfoName">{"Name: " + this.props.extraInfo.display_name}</div>
            <div className="userInfoAboutMe">{"About Me: " + this.props.extraInfo.about_me}</div>
            <div className="userInfoMusicTaste">{"Music Taste: " + this.props.extraInfo.music_taste}</div>
          </div>
        )
      }

    }

    render() {
        //prep important props info
        return (
          <Popover  id="popover-basic"
                    arrowProps= {this.props.arrowProps}
                    show= {this.props.show}
                    className= {this.props.className}
                    outOfBoundaries= {this.props.outOfBoundaries }
                    placement= {this.props.placement}
                    scheduleUpdate = {this.props.scheduleUpdate}
                    style = {this.props.style}
                    >

            <Popover.Title as="h3" className= "userInfoPopoverTitle">
              {this.props.user.display_name}
            </Popover.Title>
            <Popover.Content className="userInfoPopoverContent">
              <div className="userInfoContainer">
                {this.renderUserInfo()}
              </div>
            </Popover.Content>
          </Popover>
        )
    }
}

export default UserInfoPopover;
