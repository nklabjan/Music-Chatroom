import React, {Component} from "react";
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lounge from './chatroom/Lounge';
import Header from './homepage/header';
import queryString from "query-string";

class ContentHandler extends Component {
  
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
        window.location = "http://localhost:8080/login/";
    }
    
    handleChat() {
        this.setState({displayChat: true})
    }
    
    componentWillMount() {
        let parsed = queryString.parse(window.location.search)
        let access_token = parsed.access_token
    
        if (access_token) {
          this.setState({loggedIn: true, access_token: access_token});
        }
    }
    
    render() {
    
        if(this.state.displayChat === false) {
            if(this.state.loggedIn === false && this.state.loggedOut === true) {
                return  (
                    <div className="HomePage">
                      <Header />
                      <div className="Home-Page">
                        <button className="login" onClick={this.login.bind(this)}>Login with Spotify</button>
                      </div>
                    </div>
                )
        }
        else {
            return (
                <div className="HomePage">
                    <Header />
                    <header className="Home-Page">
                    <button className="logout" onClick={this.logout.bind(this)}>Logout</button>
                    <button className="profile">View/Edit Your Profile</button>
                    <button className="chatroom">Make New Chatroom</button>
                    <button className="chat" onClick={this.handleChat.bind(this)}>Go To Chatroom</button>
                    </header>
                </div>
            )
          }
        }
        else {
            return (
                <div>
                    <Lounge access_token={this.state.access_token}></Lounge>
                </div>
          )
        }
    };
}

export default ContentHandler;