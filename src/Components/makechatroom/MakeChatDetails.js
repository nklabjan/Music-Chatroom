import React, {Component} from "react";
import '../../css/makechatroom/MakeChatDetails.css';
import {Form} from 'react-bootstrap';

class MakeChatDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mssge: ""
        }
    }

    render() {
        return (
            <>
                <div className="makeChatDet">
                    <div className="makeChatLabel">{this.props.display + ":"}</div>
                    <div className="makeChatInfo">
                        {this.props.label === "formGenres" ?
                            (<Form.Control className="makeChatInput" id={this.props.label} as="select" multiple>
                                <option>Podcast</option>
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
                            ( this.props.label === "formDescription" ? <textarea className="makeChatInput" maxLength="100" id={this.props.label} cols="60" rows="2"></textarea> :
                            <textarea className="makeChatInput" maxLength="20" id={this.props.label} cols="60" rows="2"></textarea> )}
                        {this.props.label === "formGenres" ? <div className="restriction">max selections = 2</div> :
                            this.props.label === "formDescription" ? <div className="restriction">max characters = 100</div> :
                            <div className="restriction">max characters = 20</div>}
                    </div>
                </div>
            </>
        );
    }
}

export default MakeChatDetails;
