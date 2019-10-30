import React, {Component} from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContentHandler from '../ContentHandler';

class App extends Component {

  render() {
      return (
        <>
          <link
              rel="stylesheet"  
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossorigin="anonymous"
          />
          <ContentHandler />
        </>
      )
  }
}

export default App;
