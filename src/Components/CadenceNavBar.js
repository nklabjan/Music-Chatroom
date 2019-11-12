import React, {Component} from "react";
import {Navbar, Nav} from 'react-bootstrap';

class CadenceNavBar extends Component {
    //Include selective rendering for content

    render() {
        return  <div >
        <Navbar variant="dark"  className={this.props.scheme}
                                fixed={this.props.scheme === "CadenceNavBarInit" ? "top" : ""}>
          <Navbar.Brand >Cadence</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link href="https://www.spotify.com/premium/">Get Spotify Premium</Nav.Link>
            <Nav.Link>Who Are We?</Nav.Link>
          </Nav>
        </Navbar>
                </div>
      }

}

export default CadenceNavBar;
