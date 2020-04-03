import React, {Component} from 'react';
import Song from '../Queue/Song';
import Playlist from '../Queue/Playlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/AddSongModal.css';
import {Tooltip, OverlayTrigger, Form, Modal} from 'react-bootstrap';

let timeout = null;

class AddSongModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: '',
            playlistData: '',
            mode: 'search',
            playlistSelected: false,
            selectPlaylistData: '',
        }

        this.search = React.createRef();
        this.retrievePlaylists = this.retrievePlaylists();
        //this.retrievePlaylistTracks = this.retrievePlaylistTracks();

    }

    onPlaylistPressed(name, url) {
        this.setState({mode: "playlistSongs"});

        if (this.state.selectPlaylistData === '' || !this.state.playlistSelected)
        {
            console.log(url)
            console.log("Retrieving playlist tracks")
            this.retrievePlaylistTracks(name,url);
        }
    }

    onPlaylistBtnPressed() {
        this.setState({mode: "playlist"});

        if (this.state.playlistData === '')
        {
            this.retrievePlaylists();
        }
    }

    async getSongs() {
        let value = this.search.current.value.split(' ').join('+');
        //console.log("the length of VALUE: " + value.length);
        if(value.length === 0)
        {
            this.setState({searchData: undefined});
        }
        if (value.length > 0)
        {
          let url = 'https://api.spotify.com/v1/search/?q=' + value + '*&type=track&limit=20';
          const response = await fetch(url, {
              method: "GET",
              headers: {
                  authorization: `Bearer ${this.props.access_token}`,
              },
          });
          const myJson = await response.json();
          this.setState({ searchData: myJson });
        }
    }

    async retrievePlaylists() {
        console.log(this.props.userId);
        let url = 'https://api.spotify.com/v1/users/' + this.props.userId + '/playlists';
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this.props.access_token}`,
            },
        });
        const myJson = await response.json();
        console.log(myJson);
        this.setState({ playlistData: myJson });
    }

    async retrievePlaylistTracks(name, url) {
        console.log(this.props.userId);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this.props.access_token}`,
            },
        });
        const myJson = await response.json();
        this.setState({ selectPlaylistData: {
            name: name,
            url: url,
            songs: myJson
        } });

        console.log(myJson);
    }

    renderBodyContent()
    {
        if (this.state.mode === "search") {
            return(
                <div>
                    {this.displaySongs()}
                </div>
            )
        }
        else if (this.state.mode === "playlist"){
            return (
                <div>
                    {this.displayPlaylists()}
                </div>)
        }
        else if (this.state.mode === "playlistSongs") {
            return (
                <div>
                    {this.displayPlaylistSongs()}
                </div>)
        }

    }

    displayPlaylists() {
        let playlists = [];
            //console.log(this.state.data)
            if (this.state.playlistData !== undefined) {
                if (this.state.playlistData.total !== undefined) {
                    for (const song in Object.entries(this.state.playlistData.items)) {
                        playlists.push(
                            <Playlist   key={song}
                                        data={this.state.playlistData.items[song]}
                                        addSong={this.props.addSong}
                                        playSong={this.props.playSong}
                                        onClick={()=>this.onPlaylistPressed(this.state.playlistData.items[song].name, this.state.playlistData.items[song].tracks.href)}
                                        isLM={this.props.isLM}
                                        instantPlay={this.props.instantPlay}/>
                        )
                    }
                    //console.log(songs);
                    return playlists


                }
            }
            return "You do not have playlists available!"
    }

    displaySongs() {
            let songs = [];
            //console.log(this.state.data)
            if (this.state.searchData !== undefined) {
                if (this.state.searchData.tracks !== undefined) {
                    for (const song in Object.entries(this.state.searchData.tracks.items)) {
                        songs.push(
                            <Song key={song}
                                  data={this.state.searchData.tracks.items[song]}
                                  addSong={this.props.addSong}
                                  playSong={this.props.playSong}
                                  isLM={this.props.isLM}
                                  instantPlay={this.props.instantPlay}/>
                        )
                    }
                    //console.log(songs);
                    return songs
                }
            }
            return "Songs will be displayed as you search for them."
    }

    displayPlaylistSongs() {
        let songs = [];
        //console.log(this.state.data)
        if (this.state.selectPlaylistData !== undefined) {
            if (this.state.selectPlaylistData.songs !== undefined) {
                for (const song in Object.entries(this.state.selectPlaylistData.songs.items)) {
                    songs.push(
                        <Song key={song}
                              data={this.state.selectPlaylistData.songs.items[song].track}
                              addSong={this.props.addSong}
                              playSong={this.props.playSong}
                              isLM={this.props.isLM}
                              instantPlay={this.props.instantPlay}/>
                    )
                }
                //console.log(songs);
                return songs
            }
        }
        return "Songs will be displayed as you search for them."
    }

    onEnterPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }

    renderTitleContent() {
        if (this.state.mode === "search")
        {
            return(
                <div className="searchForm">
                    <Form.Control type='text'
                                          placeholder='Search'
                                          autoComplete='off'
                                          ref={this.search}
                                          onKeyDown={this.onEnterPress}/>
                </div>
            )
        }
        else if (this.state.mode === "playlist"){
            return(
                <div>

                </div>
            )

        }
        else if (this.state.mode === "playlistSongs"){
            return (
                <div className = "browsingHeader">
                    Browsing {this.state.selectPlaylistData ? this.state.selectPlaylistData.name: "Playlist"}
                </div>
            )
        }
    }

    timeout() {
        clearTimeout(timeout);
        var e = this;
        timeout = setTimeout(function() {
            e.getSongs();
        }, 300);
    }

    render() {
        return(
            <Modal show={this.props.show}
                   onHide={this.props.onHide}
                   className="add-song-modal">
                <Modal.Header closeButton>Add Song</Modal.Header>
                <Modal.Body className="add-song-modal-body">
                    <Form>
                        <Form.Group onChange={() => this.timeout()}>
                            <Form.Label className="add-song-modal-title">
                                <div className="modal-title-left">
                                    <OverlayTrigger overlay={this.state.mode !== "search" ? <Tooltip>Search</Tooltip> : <div></div>}>
                                            <div className="modal-title-option" onClick={()=>this.setState({mode: "search"})}>
                                                {this.state.mode === "search" ? 'Search for a song' : ''} 
                                                <FontAwesomeIcon icon={faSearch} className="searchLogo"/>
                                            </div>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={this.state.mode === "search" ? 
                                                        <Tooltip id="tooltip-disabled">Add from Playlist</Tooltip> : <div></div>}>
                                        <div className="modal-title-option" onClick={()=>this.onPlaylistBtnPressed()}>
                                            <FontAwesomeIcon icon={faList} className="searchLogo"/>
                                            {this.state.mode !== "search" ? 'Add a song from your playlist' : ''} 
                                        </div>
                                    </OverlayTrigger>
                                </div>
                                <div className="modal-title-right">
                                    {this.state.mode === "playlistSongs" ? 
                                        <OverlayTrigger overlay={<Tooltip>Back to Playlists</Tooltip>}>
                                        <div className="modal-title-option" onClick={()=>this.setState({mode: "playlist"})}>
                                            <FontAwesomeIcon icon={faArrowLeft} className="searchLogo"/>
                                        </div>
                                    </OverlayTrigger>
                                    : <div></div>}
                                </div>
                                
                            </Form.Label>
                            {this.renderTitleContent()}
                        </Form.Group>
                    </Form>
                    <div className={this.state.mode === "playlist" ? "playlist-container" : "song-container"}>
                        {this.renderBodyContent()}
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddSongModal;
