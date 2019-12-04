import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import '../../../css/chatroom/AddSongModal.css';

class Song extends Component {


  getSong() {
    // if(this.props.data.name) {
    //   if (this.state.data.name.length > 22) {
    //     let name = this.state.data.name.slice(0, 22) + "...";
    //     return name
    //   }
    // }
    // return this.state.data.name
  }

  getArtists() {
    let name = ''; 
    for(const artist in Object.entries(this.props.data.artists)) {
        if(artist === Object.entries(this.props.data.artists).length) {
          name += this.props.data.artists[artist].name;
        }
        else {
          name += this.props.data.artists[artist].name + ", ";
        }
    }
    return name;
  }

  getAlbumArt() {
    return(
        <img src={this.props.data.album.images[2].url}
             className="albumart"
             alt="Could not retrieve album art."/>
    )
  }

  render() {
    return (
      <div className="song">
          {this.getAlbumArt()}
        <div className="info">
          {this.props.data.name}
          <br />
          {this.getArtists()}
        </div>
      </div>
    )
  }
}

export default Song;
