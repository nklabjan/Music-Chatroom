import React, { Component } from "react";
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../../css/homepage/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import question_mark from '../../../images/question-mark.png';

class CardFront extends Component {
    constructor(props) {
        super(props);

        this.renderSongs = this.renderSongs.bind(this);
        this.renderCurrSong = this.renderCurrSong.bind(this);
        this.renderPrevSong = this.renderPrevSong.bind(this);
        this.renderNextSong = this.renderNextSong.bind(this);

    }

    renderCurrSong(){
      //If curr song exist

      if (this.props.chatroom.currSong !== null)
      {
        //console.log(this.props.chatroom.currSong)
        return(
          <div className="currSongContainer">
            <div className="currSongArt">
             <img src={this.props.chatroom.currSong.images[1] ?
                      this.props.chatroom.currSong.images[1].url:
                      this.props.chatroom.currSong.images[2].url}
                  alt="Not found"
                  className="cardImage"/>
            </div>
            <div className="cardSongTitle">{this.props.chatroom.currSong.title}</div>
            <div className="cardSongArtist">{this.props.chatroom.currSong.artist}</div>
          </div>
        )
      }
      else
      {
        return(
          <div className="currSongContainer">
            <div className="currSongArt">
             <img src={question_mark}
                  alt="Not found"
                  className="defCardImage"/>
            </div>
            <div className="cardSongTitle">No Songs are currently Playing</div>
          </div>
        )
      }
    }

    renderPrevSong(){
      //If prev song exist
      if (this.props.chatroom.prevSong !== null)
      {
        return(
          <OverlayTrigger overlay={
            <Tooltip id="tooltip-disabled">
              <div >{this.props.chatroom.prevSong.title}</div>
              <div>{this.props.chatroom.prevSong.artist}</div>
            </Tooltip>}>

            <div className="prevSongArt">
             <img src={this.props.chatroom.prevSong.images[2].url}
                  alt="Not found"
                  className="prevCardImage"/>
            </div>
          </OverlayTrigger>
        )
      }
    }

    renderNextSong(){
      //If next song exist
      if (this.props.chatroom.nextSong !== null)
      {
        return(
          <OverlayTrigger overlay={
            <Tooltip id="tooltip-disabled">
              <div >{this.props.chatroom.nextSong.title}</div>
              <div>{this.props.chatroom.nextSong.artist}</div>
            </Tooltip>}>

            <div className="nextSongArt">
             <img src={this.props.chatroom.nextSong.images[2].url}
                  alt="Not found"
                  className="nextCardImage"/>
            </div>
          </OverlayTrigger>
        )
      }
    }

    renderSongs(){
      return(
        <div className="songContainer">
          <div className="prevSongContainer">
            {this.renderPrevSong()}
          </div>
            {this.renderCurrSong()}
          <div className="nextSongContainer">
            {this.renderNextSong()}
          </div>
        </div>
      )
    }

    render() {
        return(
            <Card key={this.props.idx} bg="dark" text="white">
                <Card.Header className="roomCardHeader">
                    <Card.Title>{this.props.chatroom.name}</Card.Title>
                    <div className="roomFlip" onClick={this.props.handleFlip}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </div>
                </Card.Header>
                <Card.Body className="roomCardBody">
                  <div className="loungeDesc">
                    <Card.Subtitle className="cardText">
                        <div className="songView">
                        {this.renderSongs()}
                        </div>
                        <div className="infoView">
                            {
                              this.props.chatroom.genres.map((genre, genreIndex) => {
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
                    </Card.Subtitle>
                  </div>
                </Card.Body>
                <Card.Footer className="roomCardFooter">
                    <Button className="enterBtn"
                            onClick={() => this.props.joinRoom()}
                            variant="primary"
                            disabled={!this.props.isPremiumUser ? true : false}>
                        Enter Lounge
                    </Button>
                </Card.Footer>
            </Card>
        )
    }
}

export default CardFront;
