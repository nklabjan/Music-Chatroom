import React, { Component } from "react";
import { Card, Button } from 'react-bootstrap';
import '../../../css/homepage/HomePage.css';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

class LoungeCard extends Component {
    constructor(props) {
        super(props);
        this.joinRoom = this.joinRoom.bind(this);
    }

    joinRoom() {
        this.props.joinRoom(this.props.chatroom.id);
    }

    render() {
        return(
            // <Card className="createdChatRoom" key={this.props.idx} bg="dark" text="white">
            //     <Card.Header className="roomCardHeader">
            //         <Card.Title>{this.props.chatroom.name}</Card.Title>
            //         <div className="roomLock"><FontAwesomeIcon icon={faLock} /></div>
            //     </Card.Header>
            //     <Card.Body className="roomCardBody">
            //         <Card.Subtitle className="mb-2 text-muted">
            //             Master: {this.props.chatroom.loungeMasterName}
            //             <div className="loungeGenres"> {"Genre(s): " + this.props.chatroom.genres} </div>
            //         </Card.Subtitle>
            //         <div className="loungeDesc">
            //             <Card.Text className="cardText">
            //                 {this.props.chatroom.desc}
            //             </Card.Text>
            //         </div>
            //         <Button className="enterBtn"
            //             onClick={() => this.joinRoom()}
            //             variant="primary"
            //             disabled={!this.props.isPremiumUser ? true : false}>
            //             Enter Lounge
            //                   </Button>
            //     </Card.Body>
            // </Card>
            <CardFront chatroom={this.props.chatroom}
                       joinRoom={this.joinRoom}
                       isPremiumUser={this.props.isPremiumUser}/>
        )
    }
}

export default LoungeCard;