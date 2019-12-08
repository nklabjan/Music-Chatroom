import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Song from '../Queue/Song';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/AddSongModal.css';

let timeout = null;

class AddSongModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }

        this.search = React.createRef();

    }

    async getSongs() {
        let value = this.search.current.value.split(' ').join('+');
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
          this.setState({ data: myJson });
          //console.log(this.state.data);
        }

    }

    displaySongs() {
            let songs = [];
            //console.log(this.state.data)
            if (this.state.data !== undefined) {
                if (this.state.data.tracks !== undefined) {
                    for (const song in Object.entries(this.state.data.tracks.items)) {
                        songs.push(
                            <Song key={song}
                                  data={this.state.data.tracks.items[song]}
                                  addSong={this.props.addSong}
                                  playSong={this.props.playSong}
                                  isLM={this.props.isLM}/>
                        )
                    }
                    return songs


                }
            }
            return "Songs will be displayed as you search for them."
    }

    onEnterPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            //this.sendValidMessage();
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
                            <Form.Label>
                              Search for a song
                              <FontAwesomeIcon icon={faSearch} className="searchLogo"/>
                            </Form.Label>
                            <Form.Control type='text'
                                          placeholder='Search'
                                          autoComplete='off'
                                          ref={this.search}
                                          onKeyDown={this.onEnterPress}/>
                        </Form.Group>
                    </Form>
                    <div className="song-container">
                        {this.displaySongs()}
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddSongModal;
