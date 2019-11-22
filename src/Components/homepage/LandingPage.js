import React, {Component} from "react";
import LandingWindow from './LandingWindow';
import WhoAreWe from './WhoAreWe';
import '../../css/homepage/LandingPage.css';

class LandingPage extends Component {

    render() {
        if(this.props.currDisplay === "whoAreWe"){
            console.log("Made whoAreWe");
            return  <div className="LandingPage">
                        <WhoAreWe />;
                    </div>
        }
        else {
            return  <div className="LandingPage">
                    <LandingWindow login={this.props.login}/>;
                </div>
        }
      }

}

export default LandingPage;
