import React, { Component } from 'react';
import './styles/App.css';
import QueryString from 'query-string';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
        this.getSpotifyUserPlayerInfo(this.state.accessToken);
        this.setState({ isLoggedIn: true });
      })
    }
  }

  getSpotifyUserInfo = (accessToken) => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json(accessToken))
      .then(data => this.setState({
        userInfo: {
          profilePicture: data.images[0].url
        },
        isUserInfoLoaded: true
      }));
  }

  getSpotifyUserPlayerInfo = (accessToken) => {
    fetch('https://api.spotify.com/v1/me/player', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json())
      .then(data => this.setState({
        userPlayerInfo: {
          trackImgSrc: data.item.album.images[1].url,
          trackTitle: data.item.name,
          trackArtists: data.item.artists,
          trackProgress: data.progress_ms,
          trackDuration: data.item.duration_ms,
        },
        isUserPlayerInfoLoaded: true
      }));
  }

  // logIn = () => {
  //   if (window.location.href.includes('localhost')) {
  //     alert('window.location:' + window.location);
  //   } else {
  //     alert('window.location:' + window.location);
  //   }
  // }

  logIn = () => window.location=window.location.href.includes('localhost')
    ?'http://localhost:8888/login'
    :'https://listn-server.herokuapp.com/login';

  render() {
    return (
      <MuiThemeProvider>
        {
          this.state.isLoggedIn
            ? <TrackPage 
                accessToken={this.state.accessToken}
                userInfo={this.state.userInfo} 
                userPlayerInfo={this.state.userPlayerInfo}
              />
            : <LoginPage logIn={this.logIn} />
        }
      </MuiThemeProvider>

    );
  }
}

export default App;
