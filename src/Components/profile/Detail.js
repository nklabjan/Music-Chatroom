import React, {Component} from "react";
import '../../css/profile/Detail.css';

class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info
        }
    }

    onDetailChange(value) {
        this.setState({info: value});
    }

    render() {
        if(this.props.viewType === "display")
        {
            return (
                <>
                    <div className="detail">
                        <div className="label">{this.props.label}</div>
                        <div className="info">{this.state.info}</div>
                    </div>
                </>
            );
        }
        else
        {
            return (
                <>
                    <div className="detail">
                        <div className="label">{this.props.label}</div>
                        <div className="info">
                            {this.props.label === "Username:" ?
                            <><textarea className="input" maxlength="20" id={this.props.label} onChange={e => this.onDetailChange(e.target.value)} 
                                cols="100" rows="1" value={this.state.info}></textarea>
                            <div className="restriction-profile">max characters = 20</div></> : 
                            <><textarea className="input" maxlength="250" id={this.props.label} onChange={e => this.onDetailChange(e.target.value)} 
                                cols="100" rows="3" value={this.state.info}></textarea>
                            <div className="restriction-profile">max characters = 250</div></>}
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default ProfileDetail;
