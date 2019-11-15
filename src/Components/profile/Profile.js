import React, {Component} from "react";
import '../../css/profile/Profile.css';
import ProfileDetail from './Detail';
import {Modal, Button} from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "display",
            userJson: "",
            display_name: "",
            loading: true
        }
    }

    async componentDidMount() {
        const response = await fetch('https://api.spotify.com/v1/me', {
        method: "GET",
        headers: {
            authorization: `Bearer ${this.props.access_token}`,
            },
        });
        const myJson = await response.json();
        console.log("MyJson: ", myJson);
        var displayName = myJson.display_name + "'s Profile"
        this.setState({
            userJson: myJson,
            display_name: displayName,
            loading: false,
        });
    }

    editProfile() {
        this.setState({viewType: "edit"});
    }

    saveChanges() {
        this.setState({viewType: "display"});
    }

    render() {
        if(this.state.loading === false) {
            console.log(this.state.userJson.images);
        }
        return(
            <>
                <Modal className="modalProf" show={this.props.showModalProfile} onHide={this.props.handleClose} size="lg"
                        aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header className="modHeaderProf" closeButton>
                    {this.state.loading ? (
                            <p>Loading...</p>
                        ) : (
                            <img src={this.state.userJson.images[0].url} alt="Not Found" width="90vw" height="70vh"></img>
                        )}
                    <Modal.Title className="modTitleProf">{this.state.display_name}</Modal.Title>
                        </Modal.Header>
                    <Modal.Body className="modBodyProf">
                        <ProfileDetail viewType={this.state.viewType} label="Username: " info=""/>
                        <ProfileDetail viewType={this.state.viewType} label="About Me: " info=""/>
                        <ProfileDetail viewType={this.state.viewType} label="Music Taste: " info=""/>
                        <ProfileDetail viewType={this.state.viewType} label="Location: " info="" />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className="createBtnCloseProf" variant="secondary" onClick={this.props.closeProfile}>
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
