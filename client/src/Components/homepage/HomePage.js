import React, {Component} from "react";
import LandingPage from './LandingPage';
import '../../css/homepage/HomePage.css';
import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import LoungeCard from './LoungeCards/LoungeCard';

class HomePage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
        }
        this.joinRoom = this.joinRoom.bind(this);
        this.checkForLounges = this.checkForLounges.bind(this);
        this.setUpTimer = this.setUpTimer.bind(this);

    }

    joinRoom(lounge_id){
      this.props.joinChatRoom(lounge_id);
      //Join room after 100 milliseconds
      this.props.handleChat();
    }

    async setUpTimer() {
      if (this._isMounted === true && this.props.loggedInStatus === true)
      {
        this.props.getLounges();
      }

    }

    checkForLounges(interval) {
      //Check for lounges every interval
      setInterval(this.setUpTimer, interval);
    }

    componentDidMount(){
      this._isMounted = true;
      this.props.getLounges();
      this.checkForLounges(2000);
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
                          <LoungeCard key={idx}
                                      idx={idx}
                                      passed_key={idx}
                                      chatroom={chatroom}
                                      joinRoom={this.joinRoom}
                                      isPremiumUser={this.props.isPremiumUser}/>
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

    componentWillUnmount(){
      this._isMounted = false;
    }
}

export default HomePage;
