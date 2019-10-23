import React, {Component} from 'react';
import '../css/App.css';
import Lounge from '../chatroom/Lounge';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false,
        displayChat: false
    }
  }

  Login() {
    this.setState({loggedIn: true});
  }
  
  handleChat() {
    this.setState({displayChat: true})
  }
  render() {
    if(this.state.displayChat === false) {
      if(this.state.loggedIn === false) {
        return <div className="HomePage">
                  <header className="Home-Page">
                    <button class="login" onClick={this.Login.bind(this)}>Login with Spotify</button>
                  </header>
              </div>;
      }
      else {
        return <div className="HomePage">
                  <header className="Home-Page">
                    <button class="logout" onClick={this.Login.bind(this)}>Logout</button>
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
