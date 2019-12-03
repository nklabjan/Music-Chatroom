import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Song from '../Queue/Song';

class AddSongModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }

        this.search = React.createRef();
    }

    async getSongs() {
        let value = this.search.current.value.split(' ').join('+'); 
        let url = 'https://api.spotify.com/v1/search/?q=' + value + '&type=track&limit=5'; 
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

    displaySongs() {
        console.log(this.search);
        if(this.props.show === true) {
            let songs = [];

            if (Object.entries(this.state.data).length !== 0) {
                for (const song in Object.entries(this.state.data.tracks.items)) {
                    songs.push(
                        <Song data={this.state.data.tracks.items[song]} />
                    )
                }
                return songs
            }
            return "Songs will be displayed as you search for them."
        }
    }

    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>Add Song</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group onChange={() => this.getSongs()}>
                            <Form.Label>Search for a song</Form.Label>
                            <Form.Control type='text' placeholder='Search' autoComplete='off' ref={this.search} />
                        </Form.Group>
                    </Form>
                    {this.displaySongs()}
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddSongModal;