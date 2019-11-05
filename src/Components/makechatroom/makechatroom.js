import React, {Component} from "react";
import '../../css/makechatroom/makechatroom.css';

class MakeChatroom extends Component {

    render() {
        return (
            <>
                <div className="topheader">
                    <div className="makechatroomtitle">Create New Chatroom</div>
                    <button className="leavePage" onClick={this.props.handleHome}>Home</button>
                </div>
                <div className="formdet">
                    <div className="title-header">
                        <div className="details-title">Chatroom Details</div>
                    </div>
                </div>
            </>
        );
    }
}

export default MakeChatroom;