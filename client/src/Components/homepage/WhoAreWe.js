import React, {Component} from "react";
import {Image} from "react-bootstrap";
import Brian from "../../images/Brian.jpg";

class WhoAreWe extends Component {
  //{*/ <button className="login" onClick={this.props.login}>Login with Spotify</button> */}

    render() {
        return  <div className="Backdrop">
                  <div className="WhoAreWe">
                    <div className="Creator">
                      <div className="Info">
                        <Image src={Brian} className="CreatorImg" alt="A photo of Brian."></Image>
                        <div className="Name">Brian</div>
                      </div>
                      <div className="Description">
                          Brian is a Computer Science student at UW-Madison. He plans to graduate this month!
                          He has been a member of the Wisconsin Men's Club Water Polo team for the past 4 years as well.
                          After graduation, Brian hopes to find a job in the Chicago area, where he is from. <br></br>
                          "Thanks for checking out our project!"
                        </div>
                    </div>
                  </div>
                </div>
      }

}

export default WhoAreWe;
