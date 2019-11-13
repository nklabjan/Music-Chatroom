import React, {Component} from "react";
import '../../css/profile/Profile.css';
import ProfileDetail from './Detail';

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
                <div className="profileHeader">
                    <div className="profileTitle">{this.state.display_name}</div>
                </div>
                <div className="profilePic">
                    {this.state.loading ? (
                        <p>Loading...</p>
                    ) : (
                        <img src={this.state.userJson.images[0].url} alt="Not Found"></img>
                    )}
                </div>
                <div className="details">
                    <ProfileDetail viewType={this.state.viewType} label="Username: " info=""/>
                    <ProfileDetail viewType={this.state.viewType} label="About Me: " info=""/>
                    <ProfileDetail viewType={this.state.viewType} label="Music Taste: " info=""/>
                    <ProfileDetail viewType={this.state.viewType} label="Location: " info="" />
                </div>
                <div>
                    {this.state.viewType === "display" ? (
                        <button className="editButton" onClick={this.editProfile.bind(this)}>Edit Profile</button>
                    ) : (
                        <button className="editButton" onClick={this.saveChanges.bind(this)}>Save Changes</button>
                    )}
                </div>
            </>
        );
    }
}

export default Profile;
