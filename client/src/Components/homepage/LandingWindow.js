import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

class LandingWindow extends Component {
  //{*/ <button className="login" onClick={this.props.login}>Login with Spotify</button> */}

    render() {
        return  <div className="LandingWindow">
                    <div className="TagLine">Music used to be a social thing, we want to bring that back.</div>
                    <div className="LandingBtnBox">
                    <Button className="new-login"
                            size="lg"
                            onClick={this.props.login}> <FontAwesomeIcon icon={faSpotify} /> Login with Spotify </Button>
                    </div>
                </div>
      }

}

export default LandingWindow;
