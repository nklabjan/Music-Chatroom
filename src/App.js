import React, {Component} from 'react';
import './css/App.css';

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
    /**app.get('/login', function(req, res) {
      var scopes = 'user-read-private user-read-email';
      res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
      });*/
  }

  render() {
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
