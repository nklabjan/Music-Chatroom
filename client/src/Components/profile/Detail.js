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
                            <input className="input" size="100" value={this.state.info} onChange={e => this.onDetailChange(e.target.value)}></input>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default ProfileDetail;
