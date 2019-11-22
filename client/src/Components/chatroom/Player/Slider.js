import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../css/chatroom/player/Slider.css'

class SliderCom extends Component {

    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    
    componentDidMount(){
      console.log(this.props.duration);
    }

    render() {
        return (
              <div className="sliderDiv">
                <div className="position">{this.millisToMinutesAndSeconds(this.props.position)}</div>
                <div className="sliderContainer">
                  <Slider className="mySlider" onAfterChange={this.props.handleSeeking}
                          defaultValue={this.props.position/this.props.duration * 100}
                          value={(value)=>{}}/>
                </div>
                <div className="duration">{this.millisToMinutesAndSeconds(this.props.duration)}</div>
              </div>
        )
    }
}

export default SliderCom;
