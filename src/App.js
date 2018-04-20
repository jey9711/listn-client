import React, { Component } from 'react';
import './styles/App.css';
import QueryString from 'query-string';

import LoginPage from './components/LoginPage';
import TrackPage from './components/TrackPage';

class App extends Component {

  constructor() {
    super();
    this.state = {
      accessToken: null,
      isUserInfoLoaded: false,
      isUserPlayerInfoLoaded: false,
      isLoggedIn: false,
    }
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    const parsed = QueryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    if (accessToken) {
      this.setState({
        accessToken
      }, () => {
        this.getSpotifyUserInfo(this.state.accessToken);
        this.setState({ isLoggedIn: true });
      })
    }
  }

  getSpotifyUserInfo = (accessToken) => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(response => response.json(accessToken))
      .then(data => this.setState({
        userInfo: {
          profilePicture: data.images[0].url
        },
        isUserInfoLoaded: true
      }));
  }

  logIn = () => window.location=window.location.href.includes('localhost')
    ?'http://localhost:8888/login'
    :'https://listn-server.herokuapp.com/login';

  render() {
    return this.state.isLoggedIn
            ? <TrackPage 
                accessToken={this.state.accessToken}
                userInfo={this.state.userInfo} 
              />
            : <LoginPage logIn={this.logIn} />
    
  }
}

export default App;
