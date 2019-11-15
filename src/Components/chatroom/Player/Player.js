import React, {Component} from "react";
import SliderCom from './Slider';
import VolumeSlider from './VolumeSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faTimesCircle} from '@fortawesome/free-regular-svg-icons'
import { faStepForward, faStepBackward,faMusic,
        faPlusCircle, faVolumeUp} from '@fortawesome/free-solid-svg-icons'


import '../../../css/chatroom/player/Player.css'
class Player extends Component {

  constructor(props) {
      super(props);
      this.checkForPlayer = this.checkForPlayer.bind(this);
      this.createPlayerEventListeners = this.createPlayerEventListeners.bind(this);
      this.checkForPlayer();
      this.state = {
        duration: "",
        position: "",
        trackName: "",
        albumName: "",
        artistName: "",
        albumCover: ""
      }
  }

  createPlayerEventListeners() {
      //Add event listeners to browser spotify player
        this.player.on('initialization_error', e => {
          console.error(e);
        });
        this.player.on('authentication_error', e => {
          console.error(e);
        });
        this.player.on('account_error', e => {
          console.error(e);
        });
        this.player.on('playback_error', e => {
          console.error(e);
        });

        // Playback status updates
        this.player.on('player_state_changed', state => this.onStateChanged(state));

        // Ready
        this.player.on('ready', async data => {

          let { device_id } = data;
          console.log("Let the music play on!");
          await this.setState({ deviceId: device_id });
          this.transferPlaybackHere();
        });

        this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        });
      }

    checkForPlayer() {
      if (window.Spotify !== null) {
        this.player = new window.Spotify.Player({
          name: "Cadence Web Player",
          getOAuthToken: cb => { cb(this.props.access_token); },
        });
        this.createPlayerEventListeners();
        this.player.connect();
        // finally, connect!
        console.log("Spotify Player connected!");
        console.log(this.player);
      }
    }

    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    onStateChanged(state) {
      console.log(state);
      console.log("________________________________________________________");
      console.log(this.state);
      // if we're no longer listening to music, we'll get a null state.
      if (state !== null) {
        const {
          current_track: currentTrack,
        } = state.track_window;
        const position = this.millisToMinutesAndSeconds(state.position);
        const duration = this.millisToMinutesAndSeconds(state.duration);
        const trackName = currentTrack.name;
        const albumName = currentTrack.album.name;
        const albumCover = currentTrack.album.images[0].url;
        const artistName = currentTrack.artists.map(artist => artist.name).join(", ");
        const playing = !state.paused;
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          playing,
          albumCover
        });
      }
    }

    transferPlaybackHere() {
      console.log("playback transfered")
      const deviceId = this.state.deviceId;
      const access_token = this.props.access_token;
      this.props.setDeviceId(deviceId);
      fetch("https://api.spotify.com/v1/me/player", {
        method: "PUT",
        headers: {
          authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "device_ids": [ deviceId ],
          "play": true,
        }),
      });
    }

    onPrevClick() {
      this.player.previousTrack();
    }

    onPlayClick() {
      this.player.togglePlay();
    }

    onNextClick() {
      this.player.nextTrack();
    }

    render() {
        return (
            <div className="player">
            <div className="playerLeft">
              <div className="albumInfo">
                <img className="albumCover" src={this.state.albumCover} style={{width:75, height:75}} alt="Album Cover Doesn't Exist"></img>
                <div className="albumName">{this.state.albumName}</div>
              </div>
            </div>

            <div className="playerMiddle">
              <div className="controls">
                  <button className="previous" onClick={()=>{this.onPrevClick()}}>
                    <FontAwesomeIcon size="lg" icon={faStepBackward} />
                  </button>
                  <button className="play-pause" onClick={()=>{this.onPlayClick()}}>
                    <FontAwesomeIcon size="2x" icon={ this.state.playing ? faPauseCircle : faPlayCircle} />
                  </button>
                  <button className="next" onClick={()=>{this.onNextClick()}}>
                    <FontAwesomeIcon size="lg" icon={faStepForward} />
                  </button>
              </div>
                <SliderCom position={this.state.position} duration={this.state.duration}/>
              <div className="trackInfo">
                <div className="trackName">{this.state.trackName}</div>
                <div className="artistName">{this.state.artistName}</div>
              </div>
            </div>

            <div className="playerRight">
              <button className="add-song" onClick={()=>{console.log("chill")}}>
                <FontAwesomeIcon size="lg" icon={faPlusCircle} />
              </button>
              <button className="queue-list" onClick={()=>{console.log("queue")}}>
                <FontAwesomeIcon size="lg" icon={faMusic} />
              </button>
              <button className="volume" onClick={()=>{console.log("volume")}}>
                <FontAwesomeIcon size="lg" icon={faVolumeUp} />
              </button>
              <VolumeSlider />
              <button className="leave-room" onClick={()=>{this.props.handleHome()}}>
                <FontAwesomeIcon size="2x" icon={faTimesCircle} />
              </button>
            </div>
            </div>
        )
    }

    componentWillUnmount(){
      this.player.disconnect();
      this.player = null;
    }
}

export default Player;
