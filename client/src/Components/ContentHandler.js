import React, {Component} from 'react';
import Lounge from './chatroom/Lounge';
import HomePage from './homepage/HomePage';
import LandingPage from './homepage/LandingPage';
import MakeChatRoom from "./makechatroom/makechatroom";
import CadenceNavBar from './CadenceNavBar';
import {Alert} from 'react-bootstrap';
import '../css/ContentHandler.css';
import queryString from "query-string";
import axios from 'axios';
var urls = require('../constants.js');

//Remove this and put into env file if it works

class ContentHandler extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loggedInStatus: false,
        isPremiumUser: null,
        access_token: null,
        currDisplay: "home", //makeChat,lounge,home,landing,whoAreWe
        chatRooms: [],
        curr_lounge: null,
        showModalChat: false,
        userInfo: null
    }

    this.renderContent = this.renderContent.bind(this);
    this.renderAlertBar = this.renderAlertBar.bind(this);
    this.enterWhoAreWe = this.enterWhoAreWe.bind(this);
    this.exitWhoAreWe = this.exitWhoAreWe.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.saveChatRoom = this.saveChatRoom.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.leaveChatRoom = this.leaveChatRoom.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getLounges = this.getLounges.bind(this);
  }

  enterWhoAreWe() {
    console.log("enterWhoAreWe");
    this.setState({currDisplay: "whoAreWe"})
  }

  exitWhoAreWe() {
    console.log("exitWhoAreWe");
    this.setState({currDisplay: "landing"})
  }

  logout() {
    window.location = urls.frontend_uri;
  }

  login() {
    console.log("URL: ", urls.backend_url);
    window.location = urls.backend_url + '/login';
  }

  saveChatRoom(name,desc, genres) {
    //TODO: Probably not update the rooms on clientside this way
    //this.setState({chatRooms: [...this.state.chatRooms, new_chatroom]});
    // if curr_lounge is null -> create new chatroom when get into lounge
    //newInstance = {name,loungeMaster, ID, numUsers} (ID is obtained from the backend )
    // this.setState({chatRooms: [...this.state.chatRooms, newInstance]})
    axios.post(urls.backend_url + '/createLounge', {"name": name,
                                                    "loungeMasterName": this.state.userInfo.display_name,
                                                    "loungeMasterID": this.state.userInfo.id,
                                                    "desc": desc,
                                                    "genres": genres,
                                                    "access_token": this.state.access_token,
                                                    })
      .then(res => {
        console.log(res.data)
        var lounge_info = res.data.lounge_info
        //Handle lounge information
        this.setState({curr_lounge: lounge_info})
        this.setState({currDisplay: "lounge"});
      })
  }

  joinChatRoom(chatroom_id) {
    var joining_room = null;
    for (var room of this.state.chatRooms)
    {
      if (chatroom_id === room.id)
      {
        joining_room = room;
        break;
      }
    }
    this.setState({curr_lounge: joining_room})

  }

  leaveChatRoom() {
    this.setState({curr_lounge: null})
  }
  //This also now handles leave chatroom
  handleHome() {
    this.setState({currDisplay: "home"});
    this.leaveChatRoom();
  }

  handleChat() {
    this.setState({currDisplay: "lounge"});
  }

  handleClose() {
    this.setState({showModalChat: false});
    this.setState({currDisplay: "home"});
  }

  handleShow() {
    this.setState({showModalChat: true});
    this.setState({currDisplay: "makeChat"});
  }

  //Retrieves lounges from the server and updates this.state.chatRooms
  //Should be called everytime the homepage is accessed.
  getLounges() {
    //do an axios get to the backend
    axios.get(urls.backend_url + '/getLounges')
      .then(res => {
        console.log(res.data)
        this.setState({chatRooms: res.data.lounges})
      })
    this.forceUpdate();
  }

  componentWillMount() {
    let parsed = queryString.parse(window.location.search);
    let access_token = parsed.access_token;

    if (access_token) {
      this.setState({loggedInStatus: true, access_token: access_token});
    }
  }

  async componentDidMount() {
      const response = await fetch('https://api.spotify.com/v1/me', {
      method: "GET",
      headers: {
          authorization: `Bearer ${this.state.access_token}`,
          },
      });
      const myJson = await response.json();
      if(!myJson.error)
      {
        this.setState({
          userInfo: myJson,
          isPremiumUser: myJson.product === "premium" ? true : false,
        });
      }

      // if (this.state.loggedInStatus === true && this.state.userInfo.product !== "premium") {
      //   this.setState({loggedInStatus: false});
      //   this.setState({currDisplay: "landing"});
      //   alert("You need Spotify Premium to use our application!");
      // }
  }

  renderContent() {
    if(this.state.currDisplay === "whoAreWe") {
      if (this.state.loggedInStatus) {
        this.setState({currDisplay: "home"});
      } else {
        return (<LandingPage currDisplay={this.state.currDisplay}/>);
      }
    }
    if(this.state.currDisplay === "landing") {
      if (this.state.loggedInStatus) {
        this.setState({currDisplay: "home"});
      } else {
        return (<LandingPage currDisplay={this.state.currDisplay}/>)
      }
    }
    if(this.state.currDisplay === "home") {
      return (<HomePage loggedInStatus={this.state.loggedInStatus}
                        chatRooms={this.state.chatRooms}
                        login={this.login}
                        logout={this.logout}
                        handleChat={this.handleChat}
                        joinChatRoom = {this.joinChatRoom}
                        handleProfile={this.handleProfile}
                        handleMakeChat={this.handleMakeChat}
                        getLounges={this.getLounges}
                        access_token={this.state.access_token}
                        isPremiumUser={this.state.isPremiumUser}/>);
    }
    else if(this.state.currDisplay === "lounge"){
      return (<Lounge access_token={this.state.access_token}
                      handleHome={this.handleHome}
                      loungeInfo={this.state.curr_lounge}
                      userInfo={this.state.userInfo}
                      />);
    }
    else if(this.state.currDisplay === "makeChat") {
      return (<MakeChatRoom access_token={this.state.access_token}
                            handleHome={this.handleHome}
                            saveChatRoom={this.saveChatRoom}
                            handleShow={this.handleShow}
                            handleClose={this.handleClose}
                            showModalChat={this.state.showModalChat}
                            userInfo={this.state.userInfo}/>);
    }
  }

  renderAlertBar() {
    //If logged in show black bg for navbar with updated stuff
    if (this.state.isPremiumUser !== null)
    {
      if (!this.state.isPremiumUser) {
        return (
          <Alert variant="danger" className="NotPremiumAlert">
          <Alert.Heading>Oops! Looks like you don't have Spotify Premium</Alert.Heading>
          <p>
            You will need Spotify Premium to have the full Cadence experience. Get it <Alert.Link
              href="https://www.spotify.com/premium/"
              className="SpotifyLink">here</Alert.Link>.
          </p>
        </Alert>
        )
      }
    }
  }

  renderNavBar() {
    //If logged in show black bg for navbar with updated stuff
    if (this.state.loggedInStatus) {
      return (
        <CadenceNavBar  scheme="CadenceNavBar"
                        logout={this.logout}
                        access_token={this.state.access_token}
                        handleHome={this.handleHome}
                        currDisplay={this.state.currDisplay}
                        handleShow={this.handleShow}
                        userInfo={this.state.userInfo}
                        enterWhoAreWe={this.enterWhoAreWe}
                        exitWhoAreWe={this.exitWhoAreWe}
                        isPremiumUser={this.state.isPremiumUser}/>
      )
    }
    else {
      return (
            <CadenceNavBar  scheme="CadenceNavBarInit"
                            logout={this.logout}
                            access_token={this.state.access_token}
                            handleHome={this.handleHome}
                            currDisplay={this.state.currDisplay}
                            handleShow={this.handleShow}
                            userInfo={this.state.userInfo}
                            enterWhoAreWe={this.enterWhoAreWe}
                            exitWhoAreWe={this.exitWhoAreWe}/>
     )
    }
  }


  render() {
    return (<div className="Wrapper">
      {this.renderNavBar()}
      <div className="Content">
        {this.renderAlertBar()}
        {this.renderContent()}
      </div>
    </div>);
  };
}

export default ContentHandler;
