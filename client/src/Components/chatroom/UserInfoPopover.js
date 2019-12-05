import React, {Component} from "react";
import '../../css/chatroom/UserList.css';
import {Popover, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import default_pic from '../../images/anonymous.png';

class UserInfoPopover extends Component {

    render() {
        //prep important props info
        console.log(this.props.user.country)
        return (
          <Popover  id="popover-basic"
                    arrowProps= {this.props.arrowProps}
                    show= {this.props.show}
                    className= {this.props.className}
                    outOfBoundaries= {this.props.outOfBoundaries }
                    placement= {this.props.placement}
                    scheduleUpdate = {this.props.scheduleUpdate}
                    style = {this.props.style}>

            <Popover.Title as="h3">{this.props.user.display_name}</Popover.Title>
            <Popover.Content>
              <div className="userInfoContainer">
                <div className="userInfo">
                  very very interesting info...
                </div>
              </div>
            </Popover.Content>
          </Popover>
        )
    }
}

export default UserInfoPopover;
