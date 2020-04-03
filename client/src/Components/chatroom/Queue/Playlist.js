import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSortAmountUp, faTimes, faPlay } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/AddSongModal.css';

class Playlist extends Component {

  addNewSong(position){
    //call this.props.addSong from here
    let title = this.props.data.name;
    let album = this.props.data.album.name;
    let artists = this.props.data.artists.map(artist => artist.name).join(", ");
    let uri = this.props.data.uri;
    let images = this.props.data.album.images;

    let song_info = {title: title, album: album, artist: artists, uri: uri, images: images};
    this.props.addSong(song_info, position, this.props.instantPlay)
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

  getDescription() {
    if (this.props.viewType === "queue")
    {
      var name = this.props.data.description
    }
    else
    {
      name = this.props.data.description;
    }

    return name;
  }

  getAlbumArt() {
    if (this.props.data !== undefined)
    {
      var imageIdx = 2;
      if (this.props.data.images.length === 1)
      {
        imageIdx = 0
      }

      if (this.props.viewType === "queue")
      {
        return (
          <img src={this.props.data.images[imageIdx].url}
               className="albumart"
               alt="Could not retrieve playlist art."/>
        )
      }
      else
      {
        
        return (
          <img src={this.props.data.images[imageIdx].url}
               className="albumart"
               alt="Could not retrieve playlist art."/>
        )
      }
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

  renderControls() {
      return(
        <div className="resultControls">
          <button className="addResult" onClick={()=> this.addNewSong("end")}>
            <FontAwesomeIcon icon={faPlusCircle}/>
          </button>
          {this.renderAddToNextBtn()}
        </div>
      )
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
              <b>{this.props.data.name}</b>
              {this.getDescription()}
            </div>
          </div>
          {this.renderControls()}
        </div>
      )
    }
    else return (
      <div className="song" onClick={this.props.onClick}>
        <div className="albumContainer">
          {this.getAlbumArt()}
        </div>
        <div className="infoContainer">

          <div className="info">
            <b>{this.props.data.name}</b>
            <div className="subtext">{this.props.data.owner.display_name}</div>
          </div>
        </div>
        {this.renderControls()}
      </div>
    )
  }
}

export default Playlist;