import React, {Component} from "react";

class Player extends Component {

  constructor(props) {
      super(props);

      this.checkForPlayer = this.checkForPlayer.bind(this);
      this.createPlayerEventListeners = this.createPlayerEventListeners.bind(this);

      this.checkForPlayer();
  }

  createPlayerEventListeners() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
          console.error(e);

        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });

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
      if (this.player)
      {
        console.log(this.player)
      }
      // finally, connect!
      console.log("Spotify Player connected!");

    }
  }

    onStateChanged(state) {
      // if we're no longer listening to music, we'll get a null state.
      if (state !== null) {
        const {
          current_track: currentTrack,
          position,
          duration,
        } = state.track_window;
        const trackName = currentTrack.name;
        const albumName = currentTrack.album.name;
        const artistName = currentTrack.artists
          .map(artist => artist.name)
          .join(", ");
        const playing = !state.paused;
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          playing
        });
      }
    }

    transferPlaybackHere() {
      console.log(this.state);
      const deviceId = this.state.deviceId;
      const access_token = this.props.access_token;

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

    onPlayClick() {
      console.log(this.state);
      this.player.togglePlay();
    }

    render() {
        return (
            <div class="music-player">
              <div>
                <button onClick={()=>{this.onPlayClick()}}>play/pause</button>
              </div>
            </div>
        )
    }

    componentWillUnmount(){
      this.player = null;
    }
}

export default Player;
