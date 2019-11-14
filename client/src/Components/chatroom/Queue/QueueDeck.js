import React, {Component} from "react";
import { Table } from 'react-bootstrap';
import QueueCard from './QueueCard';
import '../../../css/chatroom/Queue.css'

class QueueDeck extends Component {

    render() {
        return (
                <div className="QueueDeck">
                    <div className="QueueDeckTitle">Queue</div>
                      <Table striped bordered hover variant="dark" className="queueTable">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                          </tr>
                        </thead>
                        <tbody>
                            <QueueCard  title={"All Star"}
                                        artist={"Smash Mouth"}
                                        album={"Astro Lounge"}
                                        uri={"spotify:track:3cfOd4CMv2snFaKAnMdnvK"}
                                        socket={this.socket}/>
                            <QueueCard  title={"Stacy's Mom"}
                                        artist={"Fountain of Wayne"}
                                        album={"Welcome interstate Manager"}
                                        uri={"spotify:track:27L8sESb3KR79asDUBu8nW"}
                                        socket={this.socket}/>
                        </tbody>
                      </Table>
                </div>
        )
    }
}

export default QueueDeck;
