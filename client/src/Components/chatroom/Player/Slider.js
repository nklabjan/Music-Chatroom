import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../../css/chatroom/player/Slider.css'

class SliderCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderVal: this.props.defPos,
        }

    }
    //If isPlaying is true, update position every second

    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }


    componentDidUpdate(){

      if (this.state.sliderVal !== isNaN)
      {
        //console.log(this.props.defPos);

        document.getElementsByClassName("rc-slider mySlider")[0].value = this.props.defPos;
        //document.getElementsByClassName("rc-slider-track")[0].width = this.props.defPos + "%";
        document.getElementsByClassName("rc-slider-track")[0].style.width = this.props.defPos + "%";
        document.getElementsByClassName("rc-slider-handle")[0].style.left = this.props.defPos + "%";

        //console.log(document.getElementsByClassName("mySlider")[0]);
      }
    }

    render() {
        return (
              <div className="sliderDiv">
                <div className="position">{this.millisToMinutesAndSeconds(this.props.position)}</div>
                <div className="sliderContainer">
                  <Slider className="mySlider" onAfterChange={this.props.handleSeeking}
                          defaultValue={this.state.sliderVal}
                          />
                </div>
                <div className="duration">{this.millisToMinutesAndSeconds(this.props.duration)}</div>
              </div>
        )
    }
}

export default SliderCom;
