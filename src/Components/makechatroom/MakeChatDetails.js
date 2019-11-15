import React, {Component} from "react";
import '../../css/makechatroom/MakeChatDetails.css';
import {Form} from 'react-bootstrap';

class MakeChatDetails extends Component {

    render() {
        return (
            <>
                <div className="makeChatDet">
                    <div className="makeChatLabel">{this.props.display + ":"}</div>
                    <div className="makeChatInfo">
                        {this.props.label === "formGenres" ?
                            (<Form.Control className="makeChatInput" id={this.props.label} as="select" multiple>
                                <option>Alternative</option>
                                <option>Country</option>
                                <option>Dance</option>
                                <option>Electronic</option>
                                <option>Hip Hop</option>
                                <option>Pop</option>
                                <option>Rap</option>
                                <option>Reggae</option>
                                <option>R&B/Soul</option>
                                <option>Rock</option>
                                </Form.Control>) :
                            (<textarea className="makeChatInput" id={this.props.label} cols="30" rows="4"></textarea>)}
                    </div>
                </div>
            </>
        );
    }
}

export default MakeChatDetails;
