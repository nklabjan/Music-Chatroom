import React, {Component} from 'react';
import Song from '../Queue/Song';
import Playlist from '../Queue/Playlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList, faArrowLeft, faSortDown } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/AddSongModal.css';
import {Tooltip, OverlayTrigger, Form, Modal, Button} from 'react-bootstrap';

let timeout = null;

class AddSongModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: '',
            playlists: '',
            selectPlaylistData: '',

            mode: 'search',
            playlistSelected: false,

            nextPlaylists: null,
            nextSearch: null,
            nextPlaylistSongs: null,
        }

        this.search = React.createRef();
        this.retrievePlaylists = this.retrievePlaylists();
        this.displayPlaylistTitle = this.displayPlaylistTitle.bind(this);
        //this.retrievePlaylistTracks = this.retrievePlaylistTracks();

    }

    onPlaylistPressed(name, url) {
        this.setState({mode: "playlistSongs"});

        if (this.state.selectPlaylistData === '' || !this.state.playlistSelected)
        {
            this.retrievePlaylistTracks(name,url);
        }
    }

    onPlaylistBtnPressed() {
        if (this.state.mode === "search")
        {
            this.setState({mode: "playlist"});

            if (this.state.playlists === '')
            {
                this.retrievePlaylists();
            }
        }
    }

    async getSongs() {
        let value = this.search.current.value.split(' ').join('+');

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
          console.log(myJson)

          this.setState({   searchData: myJson.tracks.items,
                            nextSearch: myJson.tracks.next });
        }
    }

    async retrievePlaylists() {
        let url = 'https://api.spotify.com/v1/users/' + this.props.userId + '/playlists';
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this.props.access_token}`,
            },
        });
        const myJson = await response.json();
        this.setState({ playlists: myJson.items,
                        nextPlaylists: myJson.next });
    }

    async retrievePlaylistTracks(name, url) {

        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this.props.access_token}`,
            },
        });
        const myJson = await response.json();
        console.log(myJson);
        this.setState({ selectPlaylistData: {
            name: name,
            url: url,
            info: myJson
        } });
    }

    async retrieveMore() {
         if (this.state.mode === "playlist")
         {
        let url = this.state.nextPlaylists;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${this.props.access_token}`,
            },
        });
        const myJson = await response.json();
        console.log(myJson);

        this.setState({ playlists: [...this.state.playlists, ...myJson.items],
                        nextPlaylists: myJson.next});

         }
         else if (this.state.mode === "search")
         {
            let url = this.state.nextSearch;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${this.props.access_token}`,
                },
            });
            const myJson = await response.json();
            console.log(myJson);
    
            this.setState({ searchData: [...this.state.searchData, ...myJson.tracks.items],
                            nextSearch: myJson.tracks.next});
         }
         else if (this.state.mode === "playlistSongs")
         {
            let url = this.state.selectPlaylistData.info.next;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${this.props.access_token}`,
                },
            });
            const myJson = await response.json();
            console.log(myJson);
    
            this.setState({ selectPlaylistData: {
                                name: this.state.selectPlaylistData.name,
                                url: this.state.selectPlaylistData.url,
                                info: {
                                    href: myJson.href,
                                    items: [...this.state.selectPlaylistData.info.items, ...myJson.items],
                                    limit: myJson.limit,
                                    next: myJson.next,
                                    total: myJson.total
                                    }
            }});
         }
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
            if (this.state.playlists !== undefined) {
                    for (const song in Object.entries(this.state.playlists)) {
                        if (this.state.playlists[song])
                        {
                            playlists.push(
                                <Playlist   key={song}
                                            data={this.state.playlists[song]}
                                            addSong={this.props.addSong}
                                            playSong={this.props.playSong}
                                            onClick={()=>this.onPlaylistPressed(this.state.playlists[song].name, this.state.playlists[song].tracks.href)}
                                            isLM={this.props.isLM}
                                            instantPlay={this.props.instantPlay}/>
                            )
                        }
                    }
                    
                    //console.log(songs);

                    //Push load more component playlists if there are more playlists available
                    
                    return (<div className = "playlists">
                        {playlists}
                        {this.state.nextPlaylists !== null ?
                        <Button onClick = {()=>this.retrieveMore()} 
                                variant="dark" 
                                className ="loadMoreBtn">
                            <FontAwesomeIcon icon={faSortDown}/>
                        </Button> : 
                        <div></div>}
                    </div>)


                
            }
            return "You do not have playlists available!"
    }

    displaySongs() {
            let songs = [];
            //console.log(this.state.data)
            if (this.state.searchData !== undefined && this.state.searchData !== '') {
                    for (const song in Object.entries(this.state.searchData)) {
                        songs.push(
                            <Song key={song}
                                  data={this.state.searchData[song]}
                                  addSong={this.props.addSong}
                                  playSong={this.props.playSong}
                                  isLM={this.props.isLM}
                                  instantPlay={this.props.instantPlay}/>
                        )
                    }
                    //console.log(songs);
                    return (<div className = "playlists">
                        {songs}
                        {this.state.nextSearch !== null ?
                        <Button onClick = {()=>this.retrieveMore()} 
                                variant="dark" 
                                className ="loadMoreBtn">
                            <FontAwesomeIcon icon={faSortDown}/>
                        </Button> : 
                        <div></div>}
                    </div>)
                
            }
            return "Songs will be displayed as you search for them."
    }

    displayPlaylistSongs() {
        let songs = [];
        //console.log(this.state.data)
        if (this.state.selectPlaylistData !== undefined) {
            if (this.state.selectPlaylistData.info !== undefined) {
                for (const song in Object.entries(this.state.selectPlaylistData.info.items)) {
                    if (this.state.selectPlaylistData.info.items[song].track)
                    {
                        songs.push(
                            <Song key={song}
                                  data={this.state.selectPlaylistData.info.items[song].track}
                                  addSong={this.props.addSong}
                                  playSong={this.props.playSong}
                                  isLM={this.props.isLM}
                                  instantPlay={this.props.instantPlay}/>
                        )
                    }
                }
                //console.log(songs);
                return (<div className = "playlists">
                        {songs}
                        {this.state.selectPlaylistData.info.next !== null ?
                        <Button onClick = {()=>this.retrieveMore()} 
                                variant="dark" 
                                className ="loadMoreBtn">
                            <FontAwesomeIcon icon={faSortDown}/>
                        </Button> : 
                        <div></div>}
                    </div>)
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
                                          onKeyDown={this.onEnterPress}
                                          autoFocus
                                          />
                </div>
            )
        }
        else if (this.state.mode === "playlistSongs"){
            var playlist = this.state.selectPlaylistData;
            return (
                <div className = "browsingHeader">
                    <div>Displaying 1 - {playlist ? playlist.info.items.length: "1"} of {playlist ? playlist.info.total: "1"}</div>
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

    displayPlaylistTitle() {
        if (this.state.mode === "search")
        {
            return ""
        }
        else if (this.state.mode === "playlist")
        {
            return "Add a song from your playlist"
        }
        else if (this.state.mode === "playlistSongs")
        {
            return (<div>
                {this.state.selectPlaylistData ? this.state.selectPlaylistData.name : "Playlist"}
            </div>)
        }
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
                                                        <Tooltip id="tooltip-disabled" >Add from Playlist</Tooltip> : <div></div>}>
                                        <div className="modal-title-option" onClick={()=>this.onPlaylistBtnPressed()}>
                                            <FontAwesomeIcon icon={faList} className="searchLogo"/>
                                            {this.displayPlaylistTitle()} 
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
