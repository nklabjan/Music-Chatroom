import React, {Component} from "react";
import '../../css/makechatroom/makechatroom.css';
import {Modal, Button} from 'react-bootstrap';
import MakeChatDetails from './MakeChatDetails';

class MakeChatroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display_name: "",
        }
    }

    handleChatroomInfo() {

      let loungeName = document.getElementById('formLoungeName').value;
      let description = document.getElementById('formDescription').value;
      const selected = document.querySelectorAll('#formGenres option:checked');
      let genres = Array.from(selected).map(el => el.value);

      if (loungeName.replace(/\s/g, '').length !== 0 && description.replace(/\s/g, '').length !== 0) {
        this.props.saveChatRoom(loungeName,description,genres);
      }
    }

    render() {
        return (
            <>
                <Modal className="modal" show={this.props.showModalChat} onHide={this.props.handleClose} size="lg"
                        aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header className="modHeader" closeButton>
                    <Modal.Title className="modTitle">Create Your Own Lounge</Modal.Title>
                        <div className="loungeMaster">
                            <p>Lounge Master: {this.props.userInfo.display_name}</p>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="modBody">
                        <MakeChatDetails label="formLoungeName" display="Lounge Name"/>
                        <MakeChatDetails label="formDescription" display="Description"/>
                        <MakeChatDetails label="formGenres" display="Genres"/>
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
