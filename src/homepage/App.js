import React, {Component} from 'react';
import '../css/App.css';
import Lounge from '../chatroom/Lounge';
const express = require('express');
const app = express();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false,
        loggedOut: true,
        displayChat: false
    }
  }

  logout() {
    this.setState({loggedOut: true})
    this.setState({loggedIn: false})
  }

  login() {
    app.get('/login', function(req, res) {

    });
    this.setState({loggedIn: true});
  }
  
  handleChat() {
    this.setState({displayChat: true})
  }

  render() {
    if(this.state.displayChat === false) {
      if(this.state.loggedIn === false && this.state.loggedOut === true) {
        return  <div className="HomePage">
                  <header className="header">
                  </header>  
                  <div className="Home-Page">
                    <button class="login" onClick={this.login.bind(this)}>Login with Spotify</button>
                  </div>
                </div>;
      }
      else {
        return <div className="HomePage">
                  <header className="header">
                  </header>  
                  <header className="Home-Page">
                    <button class="logout" onClick={this.logout.bind(this)}>Logout</button>
                    <button class="profile">View/Edit Your Profile</button>
                    <button class="chatroom">Make New Chatroom</button>
                    <button class="chat" onClick={this.handleChat.bind(this)}>Go To Chatroom</button>
                  </header>
               </div>;
      }
    }
    else {
      return(
        <div>
          <Lounge></Lounge>
        </div>
      )
    }
    
  };
}

export default App;
