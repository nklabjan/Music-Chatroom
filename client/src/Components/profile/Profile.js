import React, {Component} from "react";
import '../../css/profile/Profile.css';
import ProfileDetail from './Detail';
import {Modal, Button} from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "display",
            userName: "",
            aboutMe: "",
            musicTaste: "",
        }

        this.onDetailChange = this.onDetailChange.bind(this);
    }

    editProfile() {
        this.setState({viewType: "edit"});
    }

    saveChanges() {
      var newUserInfo = this.props.userInfo
      //First update locally,
      //update information in ContentHandler using updateProfileInfo
      //but prep using this.props.userInfo
      newUserInfo.display_name = this.state.userName;
      newUserInfo.about_me = this.state.aboutMe;
      newUserInfo.music_taste = this.state.musicTaste;

      //axios call will be done in ContentHandler.js
      this.props.updateProfileInfo(newUserInfo)

      this.setState({viewType: "display"});
    }
    
    componentDidMount() {
      this.setState({
        userName: this.props.userInfo.display_name,
        aboutMe: this.props.userInfo.about_me ? this.props.userInfo.about_me : "",
        musicTaste: this.props.userInfo.music_taste ? this.props.userInfo.music_taste : "",
      })
    }

    onDetailChange(type,value) {
      if (type === "Username") {
        this.setState({userName: value});
      }
      else if (type === "About Me") {
        this.setState({aboutMe: value});
      }
      else if (type === "Music Taste") {
        this.setState({musicTaste: value});
      }
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
                    <Modal.Title className="modTitleProf">{this.props.userInfo.display_name}'s Profile</Modal.Title>
                        </Modal.Header>
                    <Modal.Body className="modBodyProf">
                        <img src={this.props.userInfo.profile_image} alt="Not Found" ></img>
                        <ProfileDetail  viewType={this.state.viewType}
                                        label="Username"
                                        info={this.state.userName}
                                        onDetailChange={this.onDetailChange}/>
                        <ProfileDetail  viewType={this.state.viewType}
                                        label="About Me"
                                        info={this.state.aboutMe}
                                        onDetailChange={this.onDetailChange}/>
                        <ProfileDetail  viewType={this.state.viewType}
                                        label="Music Taste"
                                        info={this.state.musicTaste}
                                        onDetailChange={this.onDetailChange}/>
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
