import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSortAmountUp, faTimes, faPlay } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/AddSongModal.css';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

import question_mark from '../../../images/question-mark.png';


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

  getArtists() {
    if (this.props.viewType === "queue")
    {
      var name = this.props.data.artist
    }
    else
    {
      if (this.props.data)
      {
        name = this.props.data.artists.map(artist => artist.name).join(", ");
      }
    }

    return name;
  }

  getAlbumArt() {
      if (this.props.viewType === "queue")
      {
        return (
          <img src={this.props.data ? this.props.data.images[2].url :""}
               className="albumart"
               alt="Could not retrieve album art."/>
        )
      }
      else
      {
        var idx = 2;
        if (this.props.data.album.images === 1)
        {
          idx = 0
        }

        return (
          <img src={this.props.data.album.images.length > 0 ? this.props.data.album.images[idx].url : question_mark}
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
      <OverlayTrigger placement={"bottom"}
                      overlay={<Tooltip id="tooltip-disabled">
              Added by {this.props.data.added_by ? this.props.data.added_by :"Unknown"}
              </Tooltip>}>
          <div  className="queueSong">
            <div className="albumContainer">
              {this.getAlbumArt()}
            </div>
            <div className="infoContainer">
              <div className="info">
                <b>{this.props.data ? this.props.data.title : ""}</b>
                {this.getArtists()}
                <div className="albumName">
                    {this.props.data ? this.props.data.album : ""}
                </div>
              </div>
            </div>
            <div className="resultControls">
              {this.renderDeleteBtn()}
              {this.moveToNextBtn()}
              {this.renderPlayBtn()}
            </div>
          </div>          
        </OverlayTrigger>
        
      )
    }
    else return (
      <div className="song" onDoubleClick={()=> this.playNewSong()}>
        <div className="albumContainer">
          {this.getAlbumArt()}
        </div>
        <div className="infoContainer">

          <div className="info">
            <b>{this.props.data ? this.props.data.name : ""}</b>
            {this.getArtists()}
            <div className="albumName">
                  {this.props.data ? this.props.data.album.name : ""}
            </div>
          </div>
        </div>
        {this.renderControls()}
      </div>
    )
  }
}

export default Song;
