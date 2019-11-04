import React, {Component} from "react";
import LandingPage from './LandingPage';
import Header from './header';
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
        return  ( <div>
                    <Header />

                    <button className="logout" onClick={this.props.logout}>Logout</button>
                    <button className="profile" onClick={this.props.handleProfile}>View/Edit Your Profile</button>
                    <button className="chatroom">Make New Chatroom</button>
                    <button className="chat" onClick={this.props.handleChat}>Go To Chatroom</button>
                  </div>)

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
