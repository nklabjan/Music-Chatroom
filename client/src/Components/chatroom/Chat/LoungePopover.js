import React, {Component} from "react";
import '../../../css/chatroom/UserList.css';
import {Popover, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoungePopover extends Component {

    componentDidMount() {
      //check if extra info is null if not make a call to database
      // if (this.props.extraInfo === null)
      // {
      //   this.props.requestAdditionalInfo();
      // }
    }

    renderLoungeInfo() {
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
            No info to be displayed.
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
              ???
            </Popover.Title>
            <Popover.Content className="userInfoPopoverContent">
              <div className="userInfoContainer">
                {this.renderLoungeInfo()}
              </div>
            </Popover.Content>
          </Popover>
        )
    }
}

export default LoungePopover;
