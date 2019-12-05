import React, {Component} from "react";
import '../../css/makechatroom/makechatroom.css';
import {Modal, Button} from 'react-bootstrap';
import MakeChatDetails from './MakeChatDetails';
import AddSongModal from '../chatroom/Player/AddSongModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
class MakeChatroom extends Component {

    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.state = {
            display_name: "",
            show: false,
        }
    }

    handleChatroomInfo() {

      let loungeName = document.getElementById('formLoungeName').value;
      let description = document.getElementById('formDescription').value;
      const selected = document.querySelectorAll('#formGenres option:checked');
      let genres = Array.from(selected).map(el => el.value);

      if (loungeName.replace(/\s/g, '').length !== 0 && description.replace(/\s/g, '').length !== 0 && genres.length <= 2) {
        this.props.saveChatRoom(loungeName,description,genres);
      }
    }

    handleShow() {
        this.setState({show: true});
      }

      handleClose = () => {
        this.setState({show: false});
      }

    render() {
        console.log(this.props.access_token);
        return (
            <>
                <Modal className="modal" show={this.props.showModalChat} onHide={this.props.handleClose} size="lg"
                        aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header className="modHeader" closeButton>
                    <Modal.Title className="modTitle">Create Your Own Lounge</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modBody">
                    <button className="add-song" onClick={() => this.handleShow()}>
                        <FontAwesomeIcon size="lg" icon={faPlusCircle} />
                    </button>
                        <MakeChatDetails label="formLoungeName" display="Lounge Name"/>
                        <MakeChatDetails label="formDescription" display="Description"/>
                        <MakeChatDetails label="formGenres" display="Genres"/> 
                        <AddSongModal   show={this.state.show}
                                            onHide={this.handleClose}
                                            addSong={this.props.addSong}
                                            access_token={this.props.access_token}
                                            playSong={this.props.playSong}/>    
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="createBtnClose" variant="secondary" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button className="createBtn" variant="primary" onClick={()=>this.handleChatroomInfo()}>
                        Create Lounge
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default MakeChatroom;
