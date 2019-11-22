import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

class QueueCard extends Component {

    render() {
        return (
                        <tr className= "QueueCard" onDoubleClick={()=>this.props.playSong(this.props.uri,
                                                          this.props.passed_key)}>
                          <td><button className="queuePlayBtn"
                                      onClick={()=>this.props.playSong( this.props.uri,
                                                                        this.props.passed_key)}>
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
