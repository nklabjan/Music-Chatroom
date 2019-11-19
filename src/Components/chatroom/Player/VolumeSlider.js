import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../css/chatroom/player/Slider.css';

class VolumeSlider extends Component {

    render() {
        return (
              <div className="volSliderDiv">
                <div className="volSliderContainer">
                  <Slider className="volSlider" 
                          defaultValue={10} 
                          min={0} max={100} 
                          value={this.props.value}
                          onChange={this.props.handleVolume}/>
                </div>
              </div>
        )
    }
}

export default VolumeSlider;