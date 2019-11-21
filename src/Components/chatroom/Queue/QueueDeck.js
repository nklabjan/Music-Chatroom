import React, {Component} from "react";
import { Table } from 'react-bootstrap';
import QueueCard from './QueueCard';
import '../../../css/chatroom/Queue.css'

class QueueDeck extends Component {
  // <QueueCard  title={"All Star"}
  //             artist={"Smash Mouth"}
  //             album={"Astro Lounge"}
  //             uri={"spotify:track:3cfOd4CMv2snFaKAnMdnvK"}
  //             socket={this.props.socket}
  //             playSong={this.props.playSong}/>
  // <QueueCard  title={"Stacy's Mom"}
  //             artist={"Fountain of Wayne"}
  //             album={"Welcome interstate Manager"}
  //             uri={"spotify:track:27L8sESb3KR79asDUBu8nW"}
  //             socket={this.props.socket}
  //             playSong={this.props.playSong}/>
  // <QueueCard  title={"In My Room"}
  //             artist={"Frank Ocean"}
  //             album={"In My Room"}
  //             uri={"spotify:track:4S4Mfvv03M1cHgIOJcbUCL"}
  //             socket={this.props.socket}
  //             playSong={this.props.playSong}/>
  // <QueueCard  title={"The Other Side of Paradise"}
  //             artist={"Glass Animals"}
  //             album={"How To Be a Human Being"}
  //             uri={"spotify:track:0rRjGruFonCGOt0S5zAJNQ"}
  //             socket={this.props.socket}
  //             playSong={this.props.playSong}/>
    render() {
      if (this.props.queueList.length > 0 && this.props.queueList !== undefined)
      {
        return (
                <div className="QueueDeck">
                    <div className="QueueDeckTitle">Queue</div>
                    <div className="QueueList">
                      <Table striped hover borderless className="queueTable" >
                        <thead>
                          <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                                this.props.queueList.map((song, songIndex) => {
                                  return (
                                      <QueueCard
                                      key=    {songIndex}
                                      passed_key= {songIndex}
                                      title=  {song["title"]}
                                      artist= {song["artist"]}
                                      album=  {song["album"]}
                                      socket={this.props.socket}
                                      playSong={this.props.playSong}
                                      uri=    {song["uri"]}
                                     />
                                )
                              })
                        }
                        </tbody>
                      </Table>
                      </div>
                </div>
        )
      }
      else {
        return (
          <div className="QueueDeck">
              <div className="QueueDeckTitle">Queue</div>
              <div className="QueueList">
                There are currently no songs in the queue.
              </div>
          </div>
        )
      }

    }
}

export default QueueDeck;
