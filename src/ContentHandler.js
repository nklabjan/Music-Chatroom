import React, {Component} from 'react';
import './css/App.css';
import Lounge from './chatroom/Lounge';
import HomePage from './chatroom/HomePage';
import Header from './homepage/header';
import queryString from "query-string";
import Profile from "./profile/Profile";
//Remove this and put into env file if it works

class ContentHandler extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loggedInStatus: false,
        access_token: null,
        player_info: null,
        currDisplay: "home" //Chat,Profile,Home
    }
    this.renderContent = this.renderContent.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.handleProfile = this.handleProfile.bind(this);

  }

  logout() {
    this.setState({loggedInStatus: false})
  }

  login() {
    window.location = "http://localhost:8080/login/";
  }

  handleChat() {
    this.setState({currDisplay: "chat"})
  }

  handleProfile() {
    this.setState({currDisplay: "profile"})
  }

  componentWillMount() {
    let parsed = queryString.parse(window.location.search)
    let access_token = parsed.access_token

    if (access_token) {
      this.setState({loggedInStatus: true, access_token: access_token});
    }
  }

  renderContent() {
    if(this.state.currDisplay === "home") {
      return (<HomePage loggedInStatus={this.state.loggedInStatus}
                        login={this.login}
                        logout={this.logout}
                        handleChat={this.handleChat}
                        handleProfile={this.handleProfile}/>)
    }
    else if(this.state.currDisplay === "chat"){
      return (<Lounge access_token={this.state.access_token}/>)
    }
    else if(this.state.currDisplay === "profile")
    {
      return (<Profile access_token={this.state.access_token}/>)
    }
  }
  render() {
    return (<div>
      {this.renderContent()}
    </div>)

  };
}

export default ContentHandler;
