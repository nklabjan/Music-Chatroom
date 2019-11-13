import React, {Component} from "react";
import {Navbar, Nav, Button} from 'react-bootstrap';

class CadenceNavBar extends Component {
    //Include selective rendering for content
    selectivelyRender(){
      if (this.props.scheme === "CadenceNavBarInit")
      {
        return (
          <Navbar variant="dark"
                  className={this.props.scheme}
                  fixed={this.props.scheme === "CadenceNavBarInit" ? "top" : ""}>

            <Navbar.Brand >Cadence</Navbar.Brand>
            <Nav className="mr-auto">
          <Nav.Link href="https://www.spotify.com/premium/">Get Spotify Premium</Nav.Link>
          <Nav.Link>Who Are We?</Nav.Link>
        </Nav>
        </Navbar>)
      }
      else {
        return ( <Navbar  variant="dark"
                          className={this.props.scheme}
                          fixed={this.props.scheme === "CadenceNavBarInit" ? "top" : ""}>
                  <Navbar.Brand >Cadence</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={this.props.handleHome}>Home</Nav.Link>
          <Nav.Link onClick={this.props.handleProfile}>Profile</Nav.Link>
          <Nav.Link onClick={this.props.handleMakeChat}>Make Lounge</Nav.Link>
          <Nav.Link onClick={this.props.currDisplay === "lounge" ?
                              this.props.handleHome : this.props.handleChat}>
            {this.props.currDisplay === "lounge" ? "Leave Lounge": "Go To Lounge"}
          </Nav.Link>
        </Nav>
        <Nav id="outline-info">
          <Nav.Link >
            <Button onClick={this.props.logout}> Logout </Button>
          </Nav.Link>
        </Nav>
        </Navbar>
)
      }
    }

    render() {
        return  (<div >
          {this.selectivelyRender()}
          </div>)
      }

}

export default CadenceNavBar;
