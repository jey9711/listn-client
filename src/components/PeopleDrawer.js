import React, { Component } from 'react';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import SettingsIcon from 'mdi-react/SettingsIcon';
import SpotifyIcon from 'mdi-react/SpotifyIcon';
import MessageAlertIcon from 'mdi-react/MessageAlertIcon';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';

class PeopleDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openSettings: false,
    }

    this._handleOpenSettings = this._handleOpenSettings.bind(this);
    this._handleCloseSettings = this._handleCloseSettings.bind(this);
    this._handleRedirectToSpotify = this._handleRedirectToSpotify.bind()
  }

  _handleOpenSettings = (event) => {
    event.preventDefault();
    this.setState({
      openSettings: true,
      anchorEl: event.currentTarget,
    });
  };

  _handleCloseSettings = () => this.setState({ openSettings: false });

  _handleRedirectToSpotify = () => window.location = 'https://open.spotify.com'

  render() {

    const peopleItems = this.props.people.map((personUrl, i) =>
      <ListItem key={i}>
        <Avatar src={personUrl} size={50} />
      </ListItem>
    );

    return (
      <Drawer
        width={80}
        openSecondary={true}
        open={this.props.isOpen}
        containerStyle={{
          backgroundColor: '#191414',
          top: '74px',
          height: 'calc(100% - 142px)'
        }}
      >
        <List style={{ textAlign: 'center' }}>
          {peopleItems}
        </List>
        <List style={{
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          bottom: '0px'
        }}>
          <ListItem key={0} onClick={this._handleOpenSettings}>
            <SettingsIcon
              color="#cccccc"
              size={40}
            />
          </ListItem>
        </List>
        <Popover
          open={this.state.openSettings}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          targetOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          onRequestClose={this._handleCloseSettings}
          style={{ backgroundColor: '#191414' }}
        >
          <Menu style={{ color: '#cccccc' }}>
            <MenuItem
              primaryText="My Spotify"
              leftIcon={<SpotifyIcon />}
              style={{ color: '#cccccc' }}
              onClick={this._handleRedirectToSpotify}
            />
            <MenuItem
              primaryText="Help &amp; feedback"
              leftIcon={<MessageAlertIcon />}
              style={{ color: '#cccccc' }}
            />
            <MenuItem
              primaryText="Sign out"
              leftIcon={<ExitToAppIcon color="#f6003d" />}
              style={{ color: '#f6003d' }} onClick={this.props.logOut}
            />
          </Menu>
        </Popover>
      </Drawer>
    )
  }
}

export default PeopleDrawer;