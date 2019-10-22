import React, {Component} from 'react';
import './css/App.css';
import axios from 'axios';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false,
    }
  }

  Login() {
    this.setState({loggedIn: true});
    //return null;
    axios.get('http://localhost:3000/login', {
    }).then((response)=>{
      console.log(response)
    });
  }

  render() {
    console.log(process.env)
    if(this.state.loggedIn === false) {
      return <div className="HomePage">
                <header className="Home-Page">
                  <button onClick={this.Login.bind(this)}>Login with Spotify</button>
                </header>
            </div>;
    }
    else {
      return <div className="HomePage">
                <header className="Home-Page">
                  <button class="logout" onClick={this.Login.bind(this)}>Logout</button>
                  <button class="profile">View/Edit Your Profile</button>
                </header>
             </div>;
    }
  };
}

export default App;
