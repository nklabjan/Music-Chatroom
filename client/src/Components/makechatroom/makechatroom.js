import React, {Component} from "react";
import '../../css/makechatroom/makechatroom.css';
import {Modal, Button, Alert} from 'react-bootstrap';
import MakeChatDetails from './MakeChatDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
class MakeChatroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display_name: "",
            show: false,
            alertShow: false,
        }

    }

    closeModal() {
        this.setState({alertShow: false});
        this.props.handleClose();
    }

    handleChatroomInfo() {

      let loungeName = document.getElementById('formLoungeName').value;
      let description = document.getElementById('formDescription').value;
      const selected = document.querySelectorAll('#formGenres option:checked');
      let genres = Array.from(selected).map(el => el.value);

      if (  loungeName.replace(/\s/g, '').length !== 0 && 
            
            genres.length <= 2) {
        this.props.saveChatRoom(loungeName,description,genres);
        this.closeModal();
      }
      else
      {
        this.setState({alertShow: true});
      }

    }

    renderAlert()
    {
        console.log(this);
        if (this.state.alertShow)
        {
            return(
                <Alert variant="danger" className="NotPremiumAlert">
                  You need to enter a name for your chatroom!
                </Alert>
                )
        }
    }

    render() {
        return (
                <Modal  className="modal" 
                        show={this.props.handleShow} 
                        onHide={()=>this.closeModal()} 
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter" 
                        centered>

                    <Modal.Header className="modHeader" closeButton>
                    <Modal.Title className="modTitle">Create Your Own Lounge</Modal.Title>
                    </Modal.Header>
                    {this.renderAlert()}
                    <Modal.Body className="modBody">
                        <MakeChatDetails label="formLoungeName" display="Lounge Name"/>
                        <MakeChatDetails label="formDescription" display="Description"/>
                        <MakeChatDetails label="formGenres" display="Genres"/> 
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="createBtnClose" variant="secondary" onClick={()=>this.closeModal()}>
                        Cancel
                    </Button>
                    <Button className="createBtn" variant="primary" onClick={()=>this.handleChatroomInfo()}>
                        Create Lounge
                    </Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}

export default MakeChatroom;
