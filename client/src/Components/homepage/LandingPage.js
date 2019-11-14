import React, {Component} from "react";
import LandingWindow from './LandingWindow';
import '../../css/homepage/LandingPage.css';

class LandingPage extends Component {

    render() {
        return  <div className="LandingPage">
                    <LandingWindow login={this.props.login}/>;
                </div>
      }

}

export default LandingPage;
