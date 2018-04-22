import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import {
  storeToken,
  getToken,
  checkToken,
  logout
} from './tokenStorage'

import Auth from './Auth';
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
    if (checkToken()) {
      const access_token = getToken()
      this.getSpotifyUserInfo(access_token)
      this.setState({
        accessToken: access_token,
        redirectTo: 'room'
      })
    } else {
      this.setState({ redirectTo: 'login' })
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

  logOut = () => {
    logout();
    window.location.reload();
  }

  render() {
    return (
      <Router>
        <Switch>
          {/* <Route path="/r/" render={() => <CreateRoom/>} />
            <Route path="/r/:roomId" render={() => <TrackPage accessToken={this.state.accessToken} userInfo={this.state.userInfo} />} /> */}
          <Route exact path="/" render={() => {
            switch (this.state.redirectTo) {
              case 'login':
                return (
                  <LoginPage logIn={this.logIn} />
                )
              case 'room':
                return (
                  <TrackPage
                    accessToken={this.state.accessToken}
                    userInfo={this.state.userInfo}
                    logOut={this.logOut}
                  />
                )
              default:
                return null
            }
          }} />
          <Route path="/auth" render={() => <Auth storeToken={storeToken} />} />
          <Route path="/login" render={() => <LoginPage logIn={this.logIn} />} />
        </Switch>
      </Router>
    )
  }
}

export default App;
