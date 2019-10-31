import React, {Component} from "react";
import Profile from "../profile/Profile";


class LandingPage extends Component {

    render() {
        return  <div>
                    <button className="login" onClick={this.props.login}>Login with Spotify</button>
                </div>;
      }

}

export default LandingPage;
