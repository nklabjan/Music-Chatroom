import React, {Component} from "react";
import '../../css/Profile.css';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info
        }
    }

    onDetailChange(value)
    {
        this.setState({info: value});
    }

    render() {
        if(this.props.viewType === "display")
        {
            return (
                <>
                    <div className="detailDisplay">
                        <h4>{this.props.label}</h4>
                        <p>{this.state.info}</p>
                    </div>
                </>
            );
        }
        else
        {
            return (
                <>
                    <div className="detailEdit">
                        <h4>{this.props.label}</h4>
                        <input value={this.state.info} onChange={e => this.onDetailChange(e.target.value)}></input>
                    </div>
                </>
            );
        }
    }
}

export default Detail;
