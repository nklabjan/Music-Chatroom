import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

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
        const response = await fetch('https://api.spotify.com/v1/search/?q=' + value + '&type=track', {
            method: "GET",
            headers: {
                authorization: `Bearer ${this.props.access_token}`,
            },
        });
        const myJson = await response.json();
        this.setState({ data: myJson });
        console.log(this.state.data);
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
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddSongModal;
