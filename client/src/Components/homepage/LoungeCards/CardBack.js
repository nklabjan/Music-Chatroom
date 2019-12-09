import React, { Component } from "react";
import { Card, Button } from 'react-bootstrap';
import '../../../css/homepage/HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

class CardBack extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card key={this.props.idx} bg="dark" text="white">
                <Card.Header className="roomCardHeader">
                    <Card.Title>{this.props.chatroom.name}</Card.Title>
                    <div className="roomFlip" onClick={this.props.handleFlip}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </div>
                </Card.Header>
                <Card.Body className="roomCardBody">
                    <div className="loungeDesc">
                        <div className="cardText">
                            <div className="cardLM">
                              {"Lounge by: " + this.props.chatroom.loungeMasterName}
                            </div>
                            <div className="cardDescription">
                              {this.props.chatroom.desc}
                            </div>
                        </div>
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

export default CardBack;
