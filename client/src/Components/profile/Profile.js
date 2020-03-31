import React, {Component} from "react";
import '../../css/profile/Profile.css';
import ProfileDetail from './Detail';
import {Modal, Button, Image} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faItunesNote } from '@fortawesome/free-brands-svg-icons'
import default_pic from '../../images/anonymous.png';

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
          userName: this.props.userInfo.display_name ? this.props.userInfo.display_name : "",
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
      //Add more options for other things

    }

    render() {
        if(this.state.loading === false) {
            console.log("Still loading");
        }
        return(
                <Modal className="modalProf" show={this.props.showModalProfile} onHide={this.props.profileClose} 
                        aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header className="modHeaderProf" closeButton>
                    <Modal.Title className="modTitleProf">
                      Profile
                    </Modal.Title>
                        </Modal.Header>
                    <Modal.Body className="modBodyProf">
                        <div className="profDisplay">
                          <div className="leftProf">
                            <Image src={this.props.userInfo ? this.props.userInfo.profile_image: default_pic} alt="Not Found" roundedCircle fluid></Image>
                          </div>
                          <div className="rightProf">
                            <ProfileDetail  viewType={this.state.viewType}
                                        label="Username"
                                        info={this.state.userName}
                                        onDetailChange={this.onDetailChange}/>
                            <div className="socialBtn">
                              <Button className= "spotifyBtn">
                                <div className="musicIcon"> <FontAwesomeIcon icon={faSpotify} /> </div>
                                {
                                 this.props.userInfo !== null ? 
                                 <div>{this.props.userInfo.product === "premium" ? " Spotify Premium Connected " : " Get Spotify Premium "}</div> 
                                 : "Loading"                                  
                                }
                              </Button>
                            </div>
                            <div className="socialBtn">
                              <Button className= "appleMusicBtn">
                                <div className="musicIcon"> <FontAwesomeIcon icon={faItunesNote} /> </div>
                                {
                                 this.props.userInfo !== null ? 
                                 <div>{this.props.userInfo.apple === "premium" ? " Apple Music Connected " : " Get Apple Music "}</div> 
                                 : "Loading"                                  
                                }
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <ProfileDetail  viewType={this.state.viewType}
                                        label="About Me"
                                        info={this.state.aboutMe}
                                        onDetailChange={this.onDetailChange}/>
                        <ProfileDetail  viewType={this.state.viewType}
                                        label="Music Taste"
                                        info={this.state.musicTaste}
                                        onDetailChange={this.onDetailChange}/>
                        <ProfileDetail  viewType={this.state.viewType}
                                        label="User Experience"
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
        );
    }
}

export default Profile;
