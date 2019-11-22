import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../css/chatroom/player/Slider.css'

class SliderCom extends Component {

    componentWillMount(){
      //At mount set seek to currently played position

    }

    render() {
        return (
              <div className="sliderDiv">
                <div className="position">{this.props.position}</div>
                <div className="sliderContainer">
                  <Slider className="mySlider" onAfterChange={this.props.handleSeeking}/>
                </div>
                <div className="duration">{this.props.duration}</div>
              </div>
        )
    }
}

export default SliderCom;
