import React, {Component} from 'react';
import Lounge from './chatroom/Lounge';
import HomePage from './homepage/HomePage';
import Profile from "./profile/Profile";
import '../css/ContentHandler.css';

import queryString from "query-string";

//Remove this and put into env file if it works

class ContentHandler extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loggedInStatus: false,
        access_token: null,
        currDisplay: "home" //Chat,Profile,Home
    }

    this.renderContent = this.renderContent.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  logout() {
    this.setState({loggedInStatus: false})
  }

  login() {
    window.location = "http://localhost:8080/login/";
  }

  handleHome() {
    this.setState({currDisplay: "home"})
  }

  handleChat() {
    this.setState({currDisplay: "lounge"})
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
    else if(this.state.currDisplay === "lounge"){
      return (<Lounge access_token={this.state.access_token}
                      handleProfile={this.handleProfile}
                      handleHome={this.handleHome}/>)
    }
    else if(this.state.currDisplay === "profile")
    {
      return (<Profile access_token={this.state.access_token}/>)
    }
  }
  render() {
    return (<div className="Wrapper">
      {this.renderContent()}
    </div>)

  };
}

export default ContentHandler;
