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
            display_name: ""
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

    async componentDidMount() {
      const response = await fetch('https://api.spotify.com/v1/me', {
      method: "GET",
      headers: {
          authorization: `Bearer ${this.props.access_token}`,
          },
      });
      const myJson = await response.json();
      console.log("MyJson: ", myJson);
      var displayName = myJson.display_name;
      this.setState({
          display_name: displayName
      });
  }

    renderPage(){
      if(this.props.loggedInStatus === false) {
        return  (<LandingPage login={this.props.login}
                              currDisplay={"landing"} />)
      }
      else {
        return  (   <>
                    <div className="homeTitle">Lounges</div>
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
                            </Card.Body>
                            <Card.Footer>
                              <Button className="enterBtn" onClick={()=> this.joinRoom(chatroom.id)} variant="primary">
                                Enter Lounge
                              </Button>
                            </Card.Footer>
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
