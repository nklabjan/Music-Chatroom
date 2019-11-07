import React, {Component} from "react";
import '../../css/makechatroom/makechatroom.css';
import MakeChatDetails from './MakeChatDetails';

class MakeChatroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display_name: ""
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
        var displayName = myJson.display_name;
        this.setState({ 
            display_name: displayName
        });
    }

    render() {
        return (
            <>
                <div className="topheader">
                    <button className="saveChat" onClick="">Create</button>
                    <div className="makechatroomtitle">Create New Chatroom</div>
                    <button className="leavePage" onClick={this.props.handleHome}>Cancel</button>
                </div>
                <div className="formdet">
                    <div className="title-header">
                        <div className="details-title">Chatroom Details</div>
                    </div>
                    <div className="makeChatDetails">
                        <div className="loungeMaster">
                            <div className="loungeMasterDet">Lounge Master:</div>
                            <div className="loungeMasterInfo">{this.state.display_name}</div>
                        </div>
                        <MakeChatDetails label="Room Name:"/>
                        <MakeChatDetails label="Description:"/>
                        <MakeChatDetails label="Genres:"/>
                    </div>
                </div>
            </>
        );
    }
}

export default MakeChatroom;