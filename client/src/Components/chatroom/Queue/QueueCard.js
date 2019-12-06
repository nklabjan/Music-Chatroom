import React, {Component} from "react";

import Song from './Song';

class QueueCard extends Component {

    render() {
        return (
          <div  className= "QueueCard"
                onDoubleClick={()=>this.props.playSong(this.props.song.uri, this.props.passed_key)}>
                <Song key={this.props.passed_key}
                      passed_key={this.props.passed_key}
                      data={this.props.song}
                      playSong={this.props.playSong}
                      deleteSong = {this.props.deleteSong}
                      moveToNext = {this.props.moveToNext}
                      viewType="queue"
                      isLM={this.props.isLM}/>
          </div>
        )
    }
}

export default QueueCard;
