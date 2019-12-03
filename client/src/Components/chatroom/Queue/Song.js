import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/Queue.css';

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
    // for(const artist in this.props.data.artists) {
    //   if (this.state.data.artists[artist].name) {
    //     if (this.state.data.artists[artist].name.length > 22) {
    //       let name = this.state.data.artists[artist].name.slice(0, 22) + "...";
    //       return name
    //     }
    //   }
    //   return this.state.data.artists[artist].name
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

  // getAlbum() {
  //   // for(const album in this.state.data.album) {
  //   //   if(album == "name") {
  //   //     if(this.state.data.album[album].length > 22) {
  //   //       let name = this.state.data.album[album].name.slice(0, 22) + "...";
  //   //       return name
  //   //     }
  //   //     return this.state.data.album[album]
  //   //   }
  //   // }
  // }

  render() {
    return (
      <div className="song">
        {this.props.data.name}
        <br />
        {this.getArtists()}
      </div>
    )
  }
}

export default Song;
