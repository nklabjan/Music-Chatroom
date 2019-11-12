import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

class QueueCard extends Component {

  constructor(props) {
      super(props);
      this.playSong = this.playSong.bind(this);
  }

    playSong() {
    //Sends device ID and Access token to backend to play music
    //through socket
    //Hardcode to play "spotify:track:5bvNpG6wiIEf1PA13TkTu2" for now
    //console.log(this.props)
    let song = this.props.uri;
    console.log(this.props);
  }

    render() {
        return (
                        <tr className= "QueueCard">
                          <td><button onClick={this.playSong}><FontAwesomeIcon icon={faPlay}/></button></td>
                          <td>{this.props.title}</td>
                          <td>{this.props.artist}</td>
                          <td>{this.props.album}</td>
                        </tr>
        )
    }
}

export default QueueCard;
