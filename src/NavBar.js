import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './css/NavBar.css';

// buttons have no functionality, also if anyone knows how
// to add custom styling please show me

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaveChat: false
        }
    }

    leaveChat() {
        this.setState({leaveChat: true});
    }

    render() {
        return (
            <>
                <Navbar fixed="top" bg="light" className="navbar">
                    <Navbar.Brand onClick={this.leaveChat.bind(this)}>Cadence</Navbar.Brand>
                    <Nav className="navbar2">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Account</Nav.Link>
                    </Nav>
                </Navbar>
            </>
        )
    }
}

export default NavBar;