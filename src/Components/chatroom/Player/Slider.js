import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../css/chatroom/player/Slider.css'

class SliderCom extends Component {

    render() {
        return (
              <div className="sliderDiv">
                <Slider />
              </div>
        )
    }
}

export default SliderCom;
