import React, {Component} from "react";
import LandingPage from './LandingPage';
import '../../css/homepage/HomePage.css';


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false,
            displayProfile: false
        }
    }

    renderPage(){
      if(this.props.loggedInStatus === false) {
        return  (<LandingPage login={this.props.login}/>)
      }
      else {
        return  ( <>
                    <div>
                      <button className="logout" onClick={this.props.logout}>Logout</button>
                      <button className="profile" onClick={this.props.handleProfile}>View/Edit Your Profile</button>
                      <button className="chatroom" onClick={this.props.handleMakeChat}>Make New Chatroom</button>
                      <button className="chat" onClick={this.props.handleChat}>Go To Chatroom</button>
                    </div>
                    <div className="Chatrooms"> {
                      this.props.chatRooms.map((chatname, idx) => {
                        return (
                          <button className="createdChatRoom" onClick={this.props.handleChat} key={idx}>{chatname}</button>
                        )
                      })
                    }
                    </div>
                  </> );
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
