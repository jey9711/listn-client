import React, { Component } from 'react';

import LoginCard from './LoginCard';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import backgroundImg from './../assets/images/toronto.jpg'

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      background: backgroundImg
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${this.state.background}) no-repeat`,
          backgroundSize: '100% 100%'
        }}>
          <LoginCard logIn={this.props.logIn} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default LoginPage;
