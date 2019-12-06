import React, { Component } from "react";
import { Card, Button } from 'react-bootstrap';
import '../../../css/homepage/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

class CardFront extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card className="createdChatRoom" key={this.props.idx} bg="dark" text="white">
                <Card.Header className="roomCardHeader">
                    <Card.Title>{this.props.chatroom.name}</Card.Title>
                    <div className="roomLock"><FontAwesomeIcon icon={faAngleDoubleRight} /></div>
                </Card.Header>
                <Card.Body className="roomCardBody">
                    <Card.Subtitle className="mb-2 text-muted">
                        Master: {this.props.chatroom.loungeMasterName}
                        <div className="loungeGenres"> {"Genre(s): " + this.props.chatroom.genres} </div>
                    </Card.Subtitle>
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