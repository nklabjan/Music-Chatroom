import React, {Component} from "react";
import '../../../css/chatroom/chat/LoungeInfoPopover.css';
import {Popover, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

class LoungePopover extends Component {

    componentDidMount() {
      //check if extra info is null if not make a call to database
      // if (this.props.extraInfo === null)
      // {
      //   this.props.requestAdditionalInfo();
      // }
    }

    renderLoungeInfo() {
      if (this.props.loungeInfo === null)
      return (
        <div className="loungeInfo">
          No info to be displayed.
        </div>
      )
      //This means that we got additional info from the database
      else {
        //edit this.props.style and also this.props.arrowProps
        return (
          <div className="loungeInfoContainer">
            <div className="loungeDesc"> {this.props.loungeInfo.desc}</div>
            <div className="loungeInfoGenres">
              {
                      this.props.loungeInfo.genres.map((genre, genreIndex) => {
                        //only render songs that are after the position

                          return (
                              <Button className="genreBtn"
                                      variant="dark"
                                      key= {genreIndex}>
                              {genre}
                             </Button>
                           )

                    })
              }
            </div>
          </div>
        )
      }

    }

    render() {
        //prep important props info
        console.log(this.props.style)
        console.log(this.props.arrowProps)

        return (
          <Popover  id="popover-basic"
                    arrowProps= {this.props.arrowProps}
                    show= {this.props.show}
                    className= {"loungePopover " + this.props.className}
                    outOfBoundaries= {this.props.outOfBoundaries }
                    placement= {this.props.placement}
                    scheduleUpdate = {this.props.scheduleUpdate}
                    style = {this.props.style}
                    >

            <Popover.Title as="h3" className= "loungeInfoPopoverTitle">
              <FontAwesomeIcon icon = {faCrown} />
              <div className="popoverLMName">{this.props.loungeInfo.loungeMasterName}</div>
            </Popover.Title>
            <Popover.Content className="loungeInfoPopoverContent">
                {this.renderLoungeInfo()}
            </Popover.Content>
          </Popover>
        )
    }
}

export default LoungePopover;
