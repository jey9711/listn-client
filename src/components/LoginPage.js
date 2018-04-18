import React, { Component } from 'react';

import LoginCard from './LoginCard';

import backgroundImg from './../assets/images/toronto.jpg'
// import backgroundImg from './../assets/images/toronto_skyscrapers.jpg'
// import backgroundImg from './../assets/images/party_crowd.jpg'
// import backgroundImg from './../assets/images/party_hands.jpg'

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      background: backgroundImg
    }
  }

  render() {
    return (
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
    )
  }
}

export default LoginPage;
