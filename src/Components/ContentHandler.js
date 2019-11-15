import React, {Component} from 'react';
import Lounge from './chatroom/Lounge';
import HomePage from './homepage/HomePage';
import Profile from "./profile/Profile";
import MakeChatRoom from "./makechatroom/makechatroom";
import CadenceNavBar from './CadenceNavBar';
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
        access_token: null,
        currDisplay: "home", //Chat,Profile,Home
        chatRooms: [],
        curr_lounge: null, //curr lounge is gonna keep track of
        showModalChat: false,
        showModalProfile: false,
        userInfo: null
    }

    this.renderContent = this.renderContent.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.saveChatRoom = this.saveChatRoom.bind(this);
    this.joinChatRoom = this.joinChatRoom.bind(this);
    this.leaveChatRoom = this.leaveChatRoom.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showProfile = this.showProfile.bind(this);
    this.closeProfile = this.closeProfile.bind(this);
    this.getLounges = this.getLounges.bind(this);
  }

  logout() {
    this.setState({loggedInStatus: false});
    this.setState({currDisplay: "home"});
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
                                                    })
      .then(res => {
        console.log(res.data)
        var lounge_info = res.data.lounge_info
        //Handle lounge information
        this.setState({curr_lounge: lounge_info.id})
        this.setState({currDisplay: "lounge"});
      })
  }

  joinChatRoom(chatroom_id) {
    this.setState({curr_lounge: chatroom_id})
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

  showProfile() {
    this.setState({showModalProfile: true});
    this.setState({currDisplay: "profile"});
  }

  closeProfile() {
    this.setState({showModalProfile: false});
    this.setState({currDisplay: "home"});
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
      console.log("MyJson: ", myJson);
      //set state with user info
      this.setState({
        userInfo: myJson
      });
  }

  renderContent() {
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
                        access_token={this.state.access_token}/>);
    }
    else if(this.state.currDisplay === "lounge"){
      return (<Lounge access_token={this.state.access_token}
                      handleHome={this.handleHome}
                      loungeID={this.state.curr_lounge}
                      />);
    }
    else if(this.state.currDisplay === "profile") {
      return (<Profile access_token={this.state.access_token}
                        showProfile={this.showProfile}
                        handleClose={this.closeProfile}
                        showModalProfile={this.state.showModalProfile}
                        userInfo={this.state.userInfo}/>);
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

  renderNavBar() {
    //If logged in show black bg for navbar with updated stuff
    if (this.state.loggedInStatus)
    {
      return (
        <CadenceNavBar  scheme="CadenceNavBar"
                        logout={this.logout}
                        showProfile={this.showProfile}
                        handleHome={this.handleHome}
                        currDisplay={this.state.currDisplay}
                        handleShow={this.handleShow}/>
      )
    }
    else return (
            <CadenceNavBar  scheme="CadenceNavBarInit" />
     )

  }

  render() {
    return (<div className="Wrapper">
      {this.renderNavBar()}
      <div className="Content">
        {this.renderContent()}
      </div>
    </div>);
  };
}

export default ContentHandler;
