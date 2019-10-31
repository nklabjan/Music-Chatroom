import React, {Component} from "react";
import LandingWindow from './LandingWindow';
import CadenceNavBar from './CadenceNavBar'

class LandingPage extends Component {

    render() {
        return  <div className="LandingPage">
                    <CadenceNavBar />
                    <LandingWindow login={this.props.login}/>;
                </div>
      }

}

export default LandingPage;
