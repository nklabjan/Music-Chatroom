import React, {Component} from "react";
import '../../css/profile/Detail.css';

class ProfileDetail extends Component {

    render() {
        if(this.props.viewType === "display")
        {
            return (
                    <div className="detail">
                        {this.props.label === "Username" ? <><div className="label-user">{this.props.label + ":"}</div>
                        <div className="info-user">{this.props.info}</div></> :
                        <><div className="label">{this.props.label + ":"}</div>
                        <div className="info">{this.props.info}</div></>}
                    </div>
            );
        }
        else
        {
            return (
                    <div className="detail">
                        {this.props.label === "Username" ?
                        <div className="label-user">{this.props.label + ":"} </div> : <div className="label">{this.props.label + ":"}</div>}
                            {this.props.label === "Username" ?
                            <div className="info-user">
                                <textarea className="input" maxLength="20" id={this.props.label + ":"} onChange={e => {this.props.onDetailChange(this.props.label,e.target.value)}}
                                    cols="100" rows="1" defaultValue={this.props.info}></textarea>
                                <div className="restriction-profile">max characters = 20</div>
                                </div> :
                            <div className="info">
                                <textarea className="input" maxLength="250" id={this.props.label + ":"} onChange={e => {this.props.onDetailChange(this.props.label,e.target.value)}}
                                    cols="100" rows="3" defaultValue={this.props.info}></textarea>
                                <div className="restriction-profile">max characters = 250</div>
                            </div>}
                    </div>
            );
        }
    }
}

export default ProfileDetail;
