import React, {Component} from "react";
import { Table } from 'react-bootstrap';
import QueueCard from './QueueCard';
import '../../../css/chatroom/Queue.css'

class QueueDeck extends Component {

    render() {
        return (
                <div className="QueueDeck">
                    <div className="QueueDeckTitle">Queue</div>
                    <div className="QueueList">
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
                                        socket={this.props.socket}
                                        playSong={this.props.playSong}/>
                            <QueueCard  title={"Stacy's Mom"}
                                        artist={"Fountain of Wayne"}
                                        album={"Welcome interstate Manager"}
                                        uri={"spotify:track:27L8sESb3KR79asDUBu8nW"}
                                        socket={this.props.socket}
                                        playSong={this.props.playSong}/>
                            <QueueCard  title={"In My Room"}
                                        artist={"Frank Ocean"}
                                        album={"In My Room"}
                                        uri={"spotify:track:4S4Mfvv03M1cHgIOJcbUCL"}
                                        socket={this.props.socket}
                                        playSong={this.props.playSong}/>
                            <QueueCard  title={"The Other Side of Paradise"}
                                        artist={"Glass Animals"}
                                        album={"How To Be a Human Being"}
                                        uri={"spotify:track:0rRjGruFonCGOt0S5zAJNQ"}
                                        socket={this.props.socket}
                                        playSong={this.props.playSong}/>
                        </tbody>
                      </Table>
                      </div>
                </div>
        )
    }
}

export default QueueDeck;
