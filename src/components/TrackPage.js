import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Palette from 'react-palette';

import MainAppBar from './MainAppBar';
import PeopleDrawer from './PeopleDrawer';
import TrackDescription from './TrackDescription';
import BottomNavPlayer from './BottomNavPlayer';

class TrackPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      people: [
        "https://s3-lc-upload.s3.amazonaws.com/users/jey9711/avatar_1520649077.png",
        "https://yt3.ggpht.com/a-/AJLlDp1M4ABJkU6G_Jbf07yDkAW8c1JCmpWh02Q3xA=s900-mo-c-c0xffffffff-rj-k-no"
      ],
      openDrawer: false,
      searchDataSource: [
        'Justin Bieber',
        'Selena Gomez',
        'Sam Smith',
        'Khalid',
        'SZA',
        'Camila Cabello',
        'Charlie Puth',
        'Bruno Mars'
      ]
    }

  }

  _handleSlider = (event, value) => this.setState({ songProgress: value });

  _handleToggleDrawer = () => this.setState({ openDrawer: !this.state.openDrawer });

  render() {
    const isPropsReady =  this.props.userInfo && this.props.userPlayerInfo;
    return !isPropsReady 
      ? <div/> 
      : (
        <Palette image={this.props.userPlayerInfo.trackImgSrc}>
          {palette => (
            <div style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
              background: `linear-gradient(to bottom, ${palette.darkVibrant || palette.darkMuted} 0%, #000000 100%)`,
            }}>
              <MainAppBar
                isPeopleDrawerOpen={this.state.openDrawer}
                handleToggleDrawer={this._handleToggleDrawer}
                searchDataSource={this.state.searchDataSource}
                palette={palette}
              />
              <PeopleDrawer
                isOpen={this.state.openDrawer}
                people={[this.props.userInfo.profilePicture, ...this.state.people]}
              />
              <TrackDescription
                trackImageSrc={this.props.userPlayerInfo.trackImgSrc}
                trackTitle={this.props.userPlayerInfo.trackTitle}
                trackArtists={this.props.userPlayerInfo.trackArtists}
                style={{ paddingTop: '15%' }}
              />
              
              <BottomNavPlayer
                songProgress={this.props.userPlayerInfo.trackProgress}
                songDuration={this.props.userPlayerInfo.trackDuration}
                handleSlider={this._handleSlider}
              />
            </div>
          )}
        </Palette>
      )
  }
}

TrackPage.propTypes = {
  nowPlayingData: PropTypes.object
}

export default TrackPage;
