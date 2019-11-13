import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../css/chatroom/player/Slider.css'

class SliderCom extends Component {

    render() {
        return (
              <div className="sliderDiv">
                <div className="position">{this.props.position}</div>
                <div className="sliderContainer"><Slider className="mySlider"/></div>
                <div className="duration">{this.props.duration}</div>
              </div>
        )
    }
}

export default SliderCom;
