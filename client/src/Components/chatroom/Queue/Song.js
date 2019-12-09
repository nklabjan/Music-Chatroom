import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSortAmountUp, faTimes, faPlay } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/AddSongModal.css';

class Song extends Component {

  addNewSong(position){
    //call this.props.addSong from here
    let title = this.props.data.name;
    let album = this.props.data.album.name;
    let artists = this.props.data.artists.map(artist => artist.name).join(", ");
    let uri = this.props.data.uri;
    let images = this.props.data.album.images;

    let song_info = {title: title, album: album, artist: artists, uri: uri, images: images};
    console.log(this.props.data)
    this.props.addSong(song_info, position)
  }

  playNewSong(){
    //call this.props.addSong from here
    let title = this.props.data.name;
    let album = this.props.data.album.name;
    let artists = this.props.data.artists.map(artist => artist.name).join(", ");
    let uri = this.props.data.uri;
    let images = this.props.data.album.images;

    let song_info = {title: title, album: album, artist: artists, uri: uri, images: images};
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
    if (this.props.viewType === "queue")
    {
      var name = this.props.data.artist
    }
    else
    {
      name = this.props.data.artists.map(artist => artist.name).join(", ");
    }

    return name;
  }

  getAlbumArt() {
      if (this.props.viewType === "queue")
      {
        return (
          <img src={this.props.data.images[2].url}
               className="albumart"
               alt="Could not retrieve album art."/>
        )
      }
      else
      {
        return (
          <img src={this.props.data.album.images[2].url}
               className="albumart"
               alt="Could not retrieve album art."/>
        )
      }

  }

  renderAddToNextBtn() {
    if (this.props.isLM)
    {
      return(
        <button className="addNextResult" onClick={()=> this.addNewSong("start")}>
          <FontAwesomeIcon icon={faSortAmountUp}/>
        </button>
      )
    }
  }

  moveToNextBtn() {
    if (this.props.isLM)
    {
      return(
        <button className="addNextResult" onClick={()=> this.props.moveToNext(this.props.passed_key)}>
          <FontAwesomeIcon icon={faSortAmountUp}/>
        </button>
      )
    }
  }

  renderPlayBtn() {
    if (this.props.isLM)
    {
      return(
        <button className="addResult"
                onClick={()=> this.props.playSong(this.props.data.uri, this.props.passed_key)}>
          <FontAwesomeIcon icon={faPlay}/>
        </button>
      )
    }
  }


  renderDeleteBtn() {
    if (this.props.isLM)
    {
      return(
        <button className="addResult" onClick={()=> this.props.deleteSong(this.props.passed_key)}>
          <FontAwesomeIcon icon={faTimes}/>
        </button>
      )
    }
  }

  render() {
    if (this.props.viewType === "queue")
    {
      return (
        <div  className="queueSong">
          <div className="albumContainer">
            {this.getAlbumArt()}
          </div>
          <div className="infoContainer">
            <div className="info">
              <b>{this.props.data.title}</b>
              <br />
              {this.getArtists()}
              <br />
              <div className="albumName">
                  {this.props.data.album}
              </div>
            </div>
          </div>
          <div className="resultControls">
            {this.renderDeleteBtn()}
            {this.moveToNextBtn()}
            {this.renderPlayBtn()}
          </div>
        </div>
      )
    }
    else return (
      <div className="song" onDoubleClick={()=> this.playNewSong()}>
        <div className="albumContainer">
          {this.getAlbumArt()}
        </div>
        <div className="infoContainer">

          <div className="info">
            <b>{this.props.data.name}</b>
            <br />
            {this.getArtists()}
            <br />
            <div className="albumName">
                  {this.props.data.album.name}
            </div>
          </div>
        </div>
        <div className="resultControls">
          <button className="addResult" onClick={()=> this.addNewSong("end")}>
            <FontAwesomeIcon icon={faPlusCircle}/>
          </button>
          {this.renderAddToNextBtn()}
        </div>
      </div>
    )
  }
}

export default Song;
