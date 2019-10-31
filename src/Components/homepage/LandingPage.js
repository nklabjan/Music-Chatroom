import React, {Component} from "react";

class LandingPage extends Component {

    render() {
        return  <div className="LandingPage">
                    <button className="login" onClick={this.props.login}>Login with Spotify</button>
                </div>
      }

}

export default LandingPage;
