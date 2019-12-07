import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../css/chatroom/player/Slider.css';
const DEFAULT_VAL = 50;

class VolumeSlider extends Component {

    componentWillMount(){
      //At mount set volume to default value
      this.props.handleVolume(DEFAULT_VAL)
    }

    render() {
        return (
              <div className="volSliderDiv">
                <div className="volSliderContainer">
                  <Slider className={this.props.isMute ? "volSliderDisabled" : "volSlider"}
                          defaultValue={DEFAULT_VAL}
                          min={0} max={100}
                          value={this.props.value}
                          onChange={this.props.handleVolume}/>
                </div>
              </div>
        )
    }
}

export default VolumeSlider;
