import React, {Component} from "react";
import SliderCom from './Slider';
import VolumeSlider from './VolumeSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import { faStepForward, faStepBackward,faMusic,
        faPlusCircle, faVolumeUp, faVolumeMute} from '@fortawesome/free-solid-svg-icons';
import AddSongModal from './AddSongModal';
import '../../../css/chatroom/player/Player.css';

class Player extends Component {

  constructor(props) {
      super(props);
      this.checkForPlayer = this.checkForPlayer.bind(this);
      this.createPlayerEventListeners = this.createPlayerEventListeners.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleVolume = this.handleVolume.bind(this);
      this.addRandomSong = this.addRandomSong.bind(this);
      this.passiveTimer = this.passiveTimer.bind(this);
      this.checkForPlayer();
      this.setUpSocket();
      this.state = {
        duration: 0,
        position: 0,
        trackName: "",
        albumName: "",
        artistName: "",
        albumCover: "",
        show: false,
        value: 10,
        isMute: false,
      }
  }

  async setUpSocket() {
      var player = this;

      this.props.socket.on('toggle_play', function() {
        console.log("Play toggled")
        //Attempt to toggle play for everyone
        player.player.togglePlay();
      })
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
          //console.log("Let the music play on!");
          await this.setState({ deviceId: device_id });
          this.transferPlaybackHere();
        });

        this.player.addListener('not_ready', ({ device_id }) => {
        //console.log('Device ID has gone offline', device_id);
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
        //console.log("Spotify Player connected!");
        //console.log(this.player);
      }
    }

    handlePlayNextSong() {
      if (this.props.queueList.length > 0 && (this.props.queueList.length - this.props.queuePos > 1))
      {
        var next_song = this.props.queueList[this.props.queuePos + 1];
        this.props.playSong(next_song.uri, this.props.queuePos + 1);
      }
      else
      {
        console.log("nothing else in queue at the moment")
      }
    }

    onStateChanged(state) {
      // if we're no longer listening to music, we'll get a null state.
      if (state !== null) {
        const {
          current_track: currentTrack,
        } = state.track_window;
        const position = state.position;
        const duration = state.duration;
        const trackName = currentTrack.name;
        const albumName = currentTrack.album.name;
        const albumCover = currentTrack.album.images[0].url;
        const artistName = currentTrack.artists.map(artist => artist.name).join(", ");
        const playing = !state.paused;

        //if song is over, plays next song from Lounge's queue
        if (state.paused === true && (duration - position < 300))
        {
          this.handlePlayNextSong();
        }
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          playing,
          albumCover,
        });
      }
    }

    transferPlaybackHere() {
      //console.log("playback transfered")
      const deviceId = this.state.deviceId;
      //const access_token = this.props.access_token;
      this.props.setDeviceId(deviceId);
      this.props.syncMusicToRoom();

      // fetch("https://api.spotify.com/v1/me/player", {
      //   method: "PUT",
      //   headers: {
      //     authorization: `Bearer ${access_token}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     "device_ids": [ deviceId ],
      //     "play": true,
      //   }),
      // }).then(
      //   //try syncing up music with the lounge
      //   this.props.syncMusicToRoom()
      // );

      //instead of transfering playback now plays music according to the room
    }

    onPrevClick() {
      //cycle down song history
      //songs played this way are not added to the history list
      //Anything more than 2 seconds will cause it to restart the song
      if (this.state.position > 2000)
      {
        this.player.seek(0);
        this.setState({position: 0});
      }
      else
      {
        //messes with the queue pos
        if (this.props.queueList.length > 0 && (this.props.queuePos > 0))
        {
          var prev_song = this.props.queueList[this.props.queuePos - 1];
          this.props.playSong(prev_song.uri, this.props.queuePos - 1);
        }
        else
        {
          this.player.seek(0);
          this.setState({position: 0});
        }
      }
    }

    onPlayClick() {
      this.props.togglePlay();
      this.player.togglePlay();
    }

    onNextClick() {
      //this.player.nextTrack();
      //instead of using player's next track play music from the queue and
      //remove it from the queue
      this.handlePlayNextSong();

    }

    handleShow() {
      this.setState({show: true});
    }

    handleClose() {
      this.setState({show: false});
    }

    addRandomSong() {
      this.props.addRandomSong();
    }


    toggleVolume(){
      //If not mute
      if (!this.state.isMute)
      {
        this.player.setVolume(0);
        //Use isMute to keep track of slider color
        this.setState({isMute: true});
      }
      //is currently mute
      else
      {
        this.player.setVolume(this.state.value/100);
        this.setState({isMute: false});
      }
    }

    handleVolume = value => {
      this.setState({ value });
      if (!this.state.isMute)
      {
        if(this.state.value/100 <= 0.05) {
          this.player.setVolume(0).then(() => {
            //console.log("volume at 0");
          });
        }
        else {
          this.player.setVolume(this.state.value/100).then(() => {
            //console.log("volume updated to: " + this.state.value / 100);
          });
        }
      }
    }

    handleSeeking = value => {
      //value is a percentage of where it should be compared to the rest of the song.
      //handle timestamp
      var new_position = value/100 * this.state.duration;
      this.player.seek(new_position);
    }

    passiveTimer() {
      if (this.state.playing)
      {
        this.setState({position: this.state.position + 1000});
      }
    }

    async componentDidMount(){
      setInterval(this.passiveTimer, 1000);
     // store intervalId in the state so it can be accessed later:
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
                <SliderCom  position={this.state.position}
                            duration={this.state.duration}
                            handleSeeking={this.handleSeeking}
                            defPos={this.state.position/this.state.duration * 100}
                            playing={this.state.playing}/>
              <div className="trackInfo">
                <div className="trackName">{this.state.trackName}</div>
                <div className="artistName">{this.state.artistName}</div>
              </div>
            </div>

            <div className="playerRight">
              <button className="add-song" onClick={() => this.handleShow()}>
                <AddSongModal show={this.state.show}
                              handleClose={() => this.handleClose()}
                              access_token={this.props.access_token}/>
                <FontAwesomeIcon size="lg" icon={faPlusCircle} />
              </button>
              <button className="queue-list" onClick={()=>this.addRandomSong()}>
                <FontAwesomeIcon size="lg" icon={faMusic} />
              </button>
              <button className="volume" onClick={()=> this.toggleVolume()}>
                <FontAwesomeIcon size="lg" icon={ this.state.isMute ? faVolumeMute : faVolumeUp} />
              </button>
              <VolumeSlider value={this.state.value} handleVolume={this.handleVolume}/>
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
