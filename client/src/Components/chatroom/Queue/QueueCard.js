import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

class QueueCard extends Component {

    render() {
        return (
                        <tr className= "QueueCard">
                          <td><button className="queuePlayBtn"
                                      onClick={()=>this.props.playSong(this.props.uri)}>
                                    <FontAwesomeIcon icon={faPlay}/>
                          </button></td>
                          <td>{this.props.title}</td>
                          <td>{this.props.artist}</td>
                          <td>{this.props.album}</td>
                        </tr>
        )
    }
}

export default QueueCard;
