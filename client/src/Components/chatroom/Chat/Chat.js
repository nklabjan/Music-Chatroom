import React, {Component} from "react";
import ChatWindow from './ChatWindow';
import Messenger from './Messenger';
import LoungePopover from './LoungePopover';
import {Overlay} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../css/chatroom/chat/Chat.css';


class Chat extends Component {

  constructor(props) {
      super(props);
      this.sendMessage = this.sendMessage.bind(this);
      this.toggleShow = this.toggleShow.bind(this);

      this.loungeRef = null;
      this.setLoungeRef = element => {
          this.loungeRef = element;
        };

      this.state = {
        showLoungeInfo: false
      }
  }

  sendMessage() {
      this.props.socket.emit('message_sent',
                              document.getElementById('textarea').value,
                              this.props.loungeInfo.id);
  }
  toggleShow(){
    this.setState({showLoungeInfo: !this.state.showLoungeInfo})
  }

  getAuthToken() {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      return params.get('access_token');
  }

  render() {
      return (
              <div className="chatDisplay">
                <div className="chatroom-header">
                  <div className="loungeHeader-Part"></div>
                    <div className="title"> {this.props.loungeInfo.name} </div>
                  <div className="loungeHeader-Part">
                    <button className="loungeInfo-btn"
                            onClick={()=>this.toggleShow()}
                            ref={this.setLoungeRef}>
                      <FontAwesomeIcon icon={ faInfoCircle } className="loungeInfoIcon"/>
                    </button>
                  </div>
                </div>

                <ChatWindow messages={this.props.messages}/>
                <Messenger sendMessage={this.sendMessage}/>
                <Overlay  target={this.loungeRef}
                          show={this.state.showLoungeInfo}
                          placement="bottom">
                  {props => (
                    <LoungePopover  {...props}
                                      loungeInfo= {this.props.loungeInfo}
                                      isLM = {this.props.isLM}

                                      />
                  )}
                </Overlay>
              </div>
      )
  }
}

export default Chat;
