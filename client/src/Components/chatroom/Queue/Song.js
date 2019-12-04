import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/AddSongModal.css';

class Song extends Component {

  addNewSong(position){
    //call this.props.addSong from here
    let title = this.props.data.name;
    let album = this.props.data.album.name;
    let artists = this.props.data.artists.map(artist => artist.name).join(", ");
    let uri = this.props.data.uri;

    let song_info = {title: title, album: album, artist: artists, uri: uri};
    console.log(this.props.data)
    this.props.addSong(song_info, position)
  }

  playNewSong(){
    //call this.props.addSong from here
    let title = this.props.data.name;
    let album = this.props.data.album.name;
    let artists = this.props.data.artists.map(artist => artist.name).join(", ");
    let uri = this.props.data.uri;

    let song_info = {title: title, album: album, artist: artists, uri: uri};
    this.props.playSong(song_info)
  }

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
    var name = this.props.data.artists.map(artist => artist.name).join(", ");

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
      <div className="song" onDoubleClick={()=> this.playNewSong()}>
          {this.getAlbumArt()}
        <div className="info">
          {this.props.data.name}
          <br />
          {this.getArtists()}
        </div>
        <div className="resultControls">
          <button className="addResult" onClick={()=> this.addNewSong("end")}>
            <FontAwesomeIcon icon={faPlusCircle}/>
          </button>
          <button className="addNextResult" onClick={()=> this.addNewSong("start")}>
            <FontAwesomeIcon icon={faSortAmountUp}/>
          </button>
        </div>
      </div>
    )
  }
}

export default Song;
