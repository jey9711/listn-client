import React, { Component } from 'react';
import Redirect from 'react-router-dom/Redirect';
import QueryString from 'query-string';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.extractTokens = this.extractTokens.bind(this);
  }

  componentWillMount() {
    this.extractTokens()
  }

  extractTokens = () => {
    const parsed = QueryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    if (accessToken) {
      this.props.storeToken(accessToken);
      this.setState({ redirect: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <MuiThemeProvider>
        <CircularProgress
          size={70}
          color="#444444"
          style={{
            position: 'absolute',
            top: 'calc(50% - 35px)',
            left: 'calc(50% - 35px)',
          }}
        />
      </MuiThemeProvider>
    )
  }
}

export default Auth;