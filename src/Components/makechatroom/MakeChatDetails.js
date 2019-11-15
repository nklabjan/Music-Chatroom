import React, {Component} from "react";
import '../../css/makechatroom/MakeChatDetails.css';

class MakeChatDetails extends Component {

    render() {
        return (
            <>
                <div className="makeChatDet">
                    <div className="makeChatLabel">{this.props.display + ":"}</div>
                    <div className="makeChatInfo">
                            <textarea className="makeChatInput"
                                      id={this.props.label}
                                      cols="30"
                                      rows="4"></textarea>
                    </div>
                </div>
            </>
        );
    }
}

export default MakeChatDetails;
