import React, {Component} from "react";
import LandingPage from './LandingPage';
import '../../css/homepage/HomePage.css';
import {Card, Button} from 'react-bootstrap';


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
            displayProfile: false,
        }
        this.joinRoom = this.joinRoom.bind(this);
    }

    joinRoom(lounge_id){
      this.props.joinChatRoom(lounge_id);
      //Join room after 100 milliseconds
      this.props.handleChat();
    }

    componentWillMount(){
      this.props.getLounges();
    }


    renderPage(){
      if(this.props.loggedInStatus === false) {
        return  (<LandingPage login={this.props.login}
                              currDisplay={"landing"} />)
      }
      else {
        return  (   <>
                    <div className="homeTitleHeader">
                      <div className="homeTitle">
                      Lounges
                      </div>
                    </div>
                    <div className="Chatrooms"> {
                      this.props.chatRooms.map((chatroom, idx) => {
                        return (
                          <Card className="createdChatRoom" key={idx} bg="dark" text="white">
                            <Card.Header>
                              <Card.Title>{chatroom.name}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                              <Card.Subtitle className="mb-2 text-muted">
                                Master: {chatroom.loungeMasterName}
                                <div className="loungeGenres"> {"Genre(s): " + chatroom.genres} </div>
                              </Card.Subtitle>
                              <Card.Text className="cardText">
                                <div className="loungeDesc"> {chatroom.desc} </div>
                              </Card.Text>
                              <Button className="enterBtn"
                                      onClick={()=> this.joinRoom(chatroom.id)}
                                      variant="primary"
                                      disabled={!this.props.isPremiumUser ? true : false}>
                                Enter Lounge
                              </Button>
                            </Card.Body>

                          </Card>
                        )
                      })
                    }
                    </div>
                    </>
                  );
      }
    }

    render() {
        return (<div className="HomePage">
                    {this.renderPage()}
               </div>)

    }
}

export default HomePage;
