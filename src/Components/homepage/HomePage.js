import React, {Component} from "react";
import LandingPage from './LandingPage';
import '../../css/homepage/HomePage.css';
import {Card, Button} from 'react-bootstrap';


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
            displayProfile: false
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
        return  (<LandingPage login={this.props.login}/>)
      }
      else {
        return  (   <>
                    <div className="homeTitle">Lounges</div>
                    <div className="Chatrooms"> {
                      this.props.chatRooms.map((chatroom, idx) => {
                        return (
                          <Card className="createdChatRoom" key={idx}>
                            <Card.Body>
                              <Card.Title>Lounge Name</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">Master: {chatroom.loungeMaster} </Card.Subtitle>
                              <Card.Text>
                                This is the description the lounge master has set for this lounge.
                              </Card.Text>
                              <Button className="enterBtn" onClick={()=> this.joinRoom(chatroom.id)} variant="primary">Enter Lounge</Button>
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
                  <header className="Home-Page">
                    {this.renderPage()}
                  </header>
               </div>)

    }
}

export default HomePage;
