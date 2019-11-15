import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../../css/chatroom/player/AddSong.css';
import SongList from '../Queue/SongList';
import QueueDeck from '../Queue/QueueDeck';

let songList = new SongList();

class AddSongModal extends Component {

    onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.addSong();
            this.clearForm();
        }
    }

    handleClick = () => {
        this.addSong();
        this.clearForm();
    }

    clearForm() {
        document.getElementById('addSong').value = "";
    }

    addSong() {
        songList.add(document.getElementById('addSong').value);
    }

    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>Add songs</Modal.Header>
                <Modal.Body>
                    <textarea className="addSongArea" id="addSong" onKeyDown={this.onEnterPress}></textarea>
                    <Button className="sendSong" onClick={this.handleClick}>Add</Button>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddSongModal;