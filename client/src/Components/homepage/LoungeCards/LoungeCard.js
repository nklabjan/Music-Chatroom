import React, { Component } from "react";
import '../../../css/homepage/HomePage.css';
import CardFront from './CardFront';
import CardBack from './CardBack';
import ReactCardFlip from 'react-card-flip';


class LoungeCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFlipped: false
        };

        this.joinRoom = this.joinRoom.bind(this);
        this.handleFlip = this.handleFlip.bind(this);
    }

    joinRoom() {
        this.props.joinRoom(this.props.chatroom.id);
    }

    handleFlip(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        return(
            <ReactCardFlip isFlipped={this.state.isFlipped} 
                           flipDirection="horizontal"
                           containerStyle={{width: '25%'}}>
                <CardFront key='front'
                           chatroom={this.props.chatroom}
                           joinRoom={this.joinRoom}
                           isPremiumUser={this.props.isPremiumUser}
                           handleFlip={this.handleFlip} />
                <CardBack key='back'
                          chatroom={this.props.chatroom}
                          joinRoom={this.joinRoom}
                          isPremiumUser={this.props.isPremiumUser}
                          handleFlip={this.handleFlip} />
            </ReactCardFlip>
        )
    }
}

export default LoungeCard;