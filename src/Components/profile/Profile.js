import React, {Component} from "react";
import '../../css/profile/Profile.css';
import ProfileDetail from './Detail';
import {Modal, Button} from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "display",
        }
    }

    editProfile() {
        this.setState({viewType: "edit"});
    }

    saveChanges() {
        this.setState({viewType: "display"});
    }

    render() {
        if(this.state.loading === false) {
            console.log(this.props.userInfo.images);
        }
        return(
            <>
                <Modal className="modalProf" show={this.props.showModalProfile} onHide={this.props.profileClose} size="lg"
                        aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header className="modHeaderProf" closeButton>
                            <img src={this.props.userInfo.images[0].url} alt="Not Found" width="90vw" height="70vh"></img>
                    <Modal.Title className="modTitleProf">{this.props.userInfo.display_name}'s Profile</Modal.Title>
                        </Modal.Header>
                    <Modal.Body className="modBodyProf">
                        <ProfileDetail viewType={this.state.viewType} label="Username:" info=""/>
                        <ProfileDetail viewType={this.state.viewType} label="About Me:" info=""/>
                        <ProfileDetail viewType={this.state.viewType} label="Music Taste:" info=""/>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="createBtnCloseProf" variant="secondary" onClick={this.props.profileClose}>
                        Close
                    </Button>
                    {this.state.viewType === "display" ? (
                            <Button className="createBtnProf" variant="primary" onClick={this.editProfile.bind(this)}>Edit Profile</Button>
                        ) : (
                            <Button className="createBtnProf" variant="primary" onClick={this.saveChanges.bind(this)}>Save Profile</Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Profile;
