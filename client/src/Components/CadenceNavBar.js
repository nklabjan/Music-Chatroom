import React, {Component} from "react";
import {Navbar, Nav, Button} from 'react-bootstrap';
import Profile from "./profile/Profile";
import MakeChatRoom from "./makechatroom/makechatroom";
import '../css/CadenceNavBar.css';

class CadenceNavBar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        showModalProfile: false,
        showModalMakeChat: false
      };

      this.profileRender = this.profileRender.bind(this);

      this.makeChatRender = this.makeChatRender.bind(this);
    }


    handleClose = () => {
      this.setState({showModalProfile: false});
      this.setState({showModalMakeChat: false});
    }

    profileRender() {
      this.setState({showModalProfile: true});
    }

    makeChatRender() {
      console.log("Making chatroom...")
      this.setState({showModalMakeChat: true});
    }


    //Include selective rendering for content
    selectivelyRender(){
      if (this.props.scheme === "CadenceNavBarInit") {
        return (
          <Navbar variant="dark"
                  className={this.props.scheme}
                  fixed={this.props.scheme === "CadenceNavBarInit" ? "top" : ""}>
            {/* <Button onClick={this.props.handle}> */}
              <Navbar.Brand className="cursor" onClick={this.props.handleHome}>Cadence</Navbar.Brand>
            {/* </Button> */}
            <Nav className="mr-auto">
          <Nav.Link href="https://www.spotify.com/premium/">Get Spotify Premium</Nav.Link>
          <Nav.Link onClick={this.props.enterWhoAreWe}>Who Are We?</Nav.Link>
        </Nav>
        </Navbar>)
      }
      else {
        return ( <Navbar  variant="dark"
                          className={this.props.scheme}
                          fixed={this.props.scheme === "CadenceNavBarInit" ? "top" : ""}>
                  <Navbar.Brand className="cursor" onClick={this.props.handleHome}>Cadence</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => this.profileRender()}
                    disabled={!this.props.isPremiumUser ? true : false}>Profile</Nav.Link>
          {this.props.currDisplay === "lounge" ? <Nav.Link onClick={this.props.handleHome}>Leave Lounge</Nav.Link> :
                  <Nav.Link onClick={() => this.makeChatRender()} disabled={!this.props.isPremiumUser ? true : false}>
                  Make Lounge
                  </Nav.Link>}
        </Nav>
        <Nav id="outline-info">
          <Nav.Link >
            <Button onClick={this.props.logout}> Logout</Button>
          </Nav.Link>
        </Nav>
        </Navbar>
        )
      }
    }

    render() {
        return  (<div >
              {this.selectivelyRender()}
              {this.props.userInfo !== null ? 
                <Profile  access_token={this.props.access_token}
                userInfo={this.props.userInfo}
                showModalProfile={this.state.showModalProfile}
                updateProfileInfo={this.props.updateProfileInfo}
                profileClose={this.handleClose}/>
                :
                <></>
              }
              
              <MakeChatRoom access_token={this.props.access_token}
                            saveChatRoom={this.props.saveChatRoom}
                            handleShow={this.state.showModalMakeChat}
                            handleClose={this.handleClose}
                            userInfo={this.props.userInfo}/>
          </div>)
      }
}

export default CadenceNavBar;
