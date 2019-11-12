import React, {Component} from "react";
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import QueueCard from './QueueCard';

class QueueDeck extends Component {

    render() {
        return (
                <div className="QueueDeck">
                    <div className="QueueDeckTitle"><b>Queue Deck</b></div>

                    <Table striped bordered hover variant="dark">
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
