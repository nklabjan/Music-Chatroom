import React, {Component} from 'react';
import '../css/App.css';
import Lounge from '../chatroom/Lounge';
import axios from "axios";
import queryString from "query-string";
//Remove this and put into env file if it works
const my_client_id= "0a1619391e204b8090a1b1adb5e19bca";
const redirect_uri = "http://localhost:8080/"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false,
        loggedOut: true,
        displayChat: false,
        userInfo: {}
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

  componentDidMount() {
    let parsed = queryString.parse(window.location.search)
    let access_token = parsed.access_token

    if (access_token)
    {
      this.setState({loggedIn: true});
    }
    fetch("https://api.spotify.com/v1/me", {headers:
      {'Authorization': 'Bearer ' + access_token}})
      .then(response => response.json())
      .then(data => console.log(data))
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
