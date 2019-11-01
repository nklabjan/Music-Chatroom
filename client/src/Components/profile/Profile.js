import React, {Component} from "react";
import '../../css/profile/Profile.css';
import Detail from './Detail';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewType: "display",
            userJson: "temp",
            loading: true
        }
    }

    async componentDidMount()
    {
        const response = await fetch('https://api.spotify.com/v1/me', {
        method: "GET",
        headers: {
            authorization: `Bearer ${this.props.access_token}`,
            },
        });
        const myJson = await response.json();
        this.setState({userJson: myJson, loading: false});
    }

    editProfile() {
        this.setState({viewType: "edit"});
    }

    saveChanges() {
        this.setState({viewType: "display"});
    }

    render() {
        if(this.state.loading === false)
        {
            console.log(this.state.userJson.images);
        }
            return(
                <>
                    <h1 className="profileHeader">
                        My Profile
                    </h1>
                    <div>
                        {this.state.loading ? (
                            <p>Loading...</p>
                        ) : (
                            <img src={this.state.userJson.images[0].url} alt="Not Found"></img>
                        )}
                    </div>
                    <div className="details">
                        <h2>Bio</h2>
                        <Detail viewType={this.state.viewType} label="About Me: " info="This is something about me"/>
                        <Detail viewType={this.state.viewType} label="Music Taste: " info="This is my music taste"/>
                        <Detail viewType={this.state.viewType} label="Location: " info="Madison, WI" />
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
