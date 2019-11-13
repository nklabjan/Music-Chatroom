import React, {Component} from "react";
import '../../css/makechatroom/MakeChatDetails.css';

class MakeChatDetails extends Component {

    render() {
        return (
            <>
                <div className="makeChatDet">
                    <div className="makeChatLabel">{this.props.label}</div>
                    <div className="makeChatInfo">
                            <textarea className="makeChatInput" cols="20" rows="2"></textarea>
                    </div>
                </div>
            </>
        );
    }
}

export default MakeChatDetails;
