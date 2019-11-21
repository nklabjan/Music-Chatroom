import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/Queue.css';

class Song extends Component {

  constructor(props) {
    super(props);
    this.songID = this.props.uri.slice(14);
    this.state = {
      data: ""
    }
  }

  async componentDidMount() {
    const response = await fetch('https://api.spotify.com/v1/tracks/' + this.songID, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.props.access_token}`,
      },
    });
    const myJson = await response.json();
    this.setState({ data: myJson });
  }

  getSong() {
    if(this.state.data.name) {
      if (this.state.data.name.length > 22) {
        let name = this.state.data.name.slice(0, 22) + "...";
        return name
      }
    }
    return this.state.data.name
  }

  getArtists() {
    for(const artist in this.state.data.artists) {
      if (this.state.data.artists[artist].name) {
        if (this.state.data.artists[artist].name.length > 22) {
          let name = this.state.data.artists[artist].name.slice(0, 22) + "...";
          return name
        }
      }
      return this.state.data.artists[artist].name
    }
  }

  getAlbum() {
    for(const album in this.state.data.album) {
      if(album == "name") {
        if(this.state.data.album[album].length > 22) {
          let name = this.state.data.album[album].name.slice(0, 22) + "...";
          return name
        }
        return this.state.data.album[album]
      }
    }
  }

  render() {
    return (
      <div className="song">
        {this.getSong()}
        <br />
        {this.getArtists()}
        <br />
        {this.getAlbum()}
      </div>
    )
  }
}

export default Song;
