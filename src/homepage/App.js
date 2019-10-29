import React, {Component} from 'react';
import '../css/App.css';
import Lounge from '../chatroom/Lounge';
import axios from "axios";
import queryString from "query-string";
//Remove this and put into env file if it works

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false,
        loggedOut: true,
        displayChat: false,
        access_token: null,
        player_info: null
    }
  }

  logout() {
    this.setState({loggedOut: true})
    this.setState({loggedIn: false})
  }

  login() {
    //What happens here? - User gets prompted to log into Spotify
    //If user successfully logs into spotify then the token gets passed to the backend
    //For verification and request for a refresh token etc etc
    window.location = "http://localhost:8080/login/";
  }

  handleChat() {
    this.setState({displayChat: true})
  }

  componentWillMount() {
    let parsed = queryString.parse(window.location.search)
    let access_token = parsed.access_token

    if (access_token)
    {
      this.setState({loggedIn: true, access_token: access_token});

    }

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
            <Lounge access_token={this.state.access_token}></Lounge>
          </div>

      )
    }

  };
}

export default App;
