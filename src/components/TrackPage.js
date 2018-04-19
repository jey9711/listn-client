import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import PropTypes from 'prop-types';
import Palette from 'react-palette';

import MainAppBar from './MainAppBar';
import PeopleDrawer from './PeopleDrawer';
import TrackDescription from './TrackDescription';
import BottomNavPlayer from './BottomNavPlayer';

import grayImg from './../assets/images/gray.jpg';

class TrackPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTrackPlaying: false,
      activeTrack: null,
      activeTrackImgSrc: grayImg,
      activeTrackProgress: 0,
      activeTrackDuration: 0,
      isPlayerDataLoaded: false,
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
    this.setupConnect = this.setupConnect.bind(this);
    this._handleToggleIsPlaying = this._handleToggleIsPlaying.bind(this);
    this._handleChangeProgress = this._handleChangeProgress.bind(this);
    this._handleChangeProgressSlider = this._handleChangeProgressSlider.bind(this);
    this._handleChangeActiveTrack = this._handleChangeActiveTrack.bind(this);
    this._handleChangePlaybackState = this._handleChangePlaybackState.bind(this);
    this._handleTogglePeopleDrawer = this._handleTogglePeopleDrawer.bind(this);
  }

  componentWillMount() {
    if (this.props.accessToken) {
      this.setupConnect(this.props.accessToken);
    }
  }

  setupConnect = (accessToken) => {
    const backend_socket_url = window.location.href.includes('localhost')
      ? 'http://localhost:8888/connect'
      : 'https://listn-server.herokuapp.com/connect';
    const io = openSocket(backend_socket_url)
    console.log(io);
    io.emit('initiate', { accessToken: accessToken });
    const wrappedHandler = (event, handler) => {
      io.on(event, data => {
        handler(data)
      })
    }
    wrappedHandler('initial_state', state => {
      this._handleToggleIsPlaying(state.is_playing)
      this._handleChangeActiveTrack(state.item)
      this._handleChangeProgress(state.progress_ms)
      this.setState({ isPlayerDataLoaded: true })
      this.progressTimer = window.setInterval(() => {
        if (this.state.isTrackPlaying &&
          this.state.activeTrackProgress + 100 <= this.state.activeTrackDuration) {
          this._handleChangeProgress(this.state.activeTrackProgress + 300)
        }
      }, 300)
    })
    wrappedHandler('playback_started', () => this._handleToggleIsPlaying(true))
    wrappedHandler('playback_paused', () => this._handleToggleIsPlaying(false))
    wrappedHandler('track_change', this._handleChangeActiveTrack)
    wrappedHandler('seek', this._handleChangeProgress)
    this.io = io
  }

  _handleToggleIsPlaying = (isPlaying) => this.setState({ isTrackPlaying: isPlaying});
  
  _handleChangeProgress = (progress, timestamp) => this.setState({ activeTrackProgress: progress })
  
  _handleChangeProgressSlider = (event, value) => {
    this.state.io.emit('seek', value);
    this.setState({ activeTrackProgress: value });
  }

  _handleChangeActiveTrack = (activeTrack) => this.setState({
    activeTrack: activeTrack,
    activeTrackImgSrc: activeTrack.album.images[1].url,
    activeTrackDuration: activeTrack.duration_ms,
  });

  _handleChangePlaybackState = (event, value) => {
    switch(event) {
      case 'backward':
        this.state.activeTrackProgress < 2000
          ? this.io.emit('previous_track')
          : this.io.emit('seek', 0)
        break;
      case 'resume':
        this._handleToggleIsPlaying(true);
        this.io.emit('resume');
        break;
      case 'pause':
        this._handleToggleIsPlaying(false);
        this.io.emit('pause');
        break;
      case 'forward':
        this.io.emit('next_track');
        break;
      default:
        break;
    }
  }

  _handleTogglePeopleDrawer = () => this.setState({ openDrawer: !this.state.openDrawer });

  render() {
    const isPropsReady =  this.props.userInfo && this.props.userPlayerInfo;
    return !isPropsReady 
      ? <div/> 
      : (
        <Palette image={this.state.activeTrackImgSrc}>
        {/* <Palette image={this.props.userPlayerInfo.trackImgSrc}> */}
          {palette => (
            <div style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
              background: `linear-gradient(to bottom, ${palette.darkVibrant || palette.darkMuted || '#444444'} 0%, #000000 100%)`,
            }}>
              <MainAppBar
                isPeopleDrawerOpen={this.state.openDrawer}
                handleToggleDrawer={this._handleTogglePeopleDrawer}
                searchDataSource={this.state.searchDataSource}
                palette={palette}
              />
              <PeopleDrawer
                isOpen={this.state.openDrawer}
                people={[this.props.userInfo.profilePicture, ...this.state.people]}
              />
              {this.state.isPlayerDataLoaded
                ? (
                  <TrackDescription
                    activeTrack={this.state.activeTrack}
                    style={{ paddingTop: '13.5%' }}
                    trackImageSrc={this.props.userPlayerInfo.trackImgSrc}
                    trackTitle={this.props.userPlayerInfo.trackTitle}
                    trackArtists={this.props.userPlayerInfo.trackArtists}
                  />
                )
                :
                <span>Loading...</span>

              }
              {/* <TrackDescription
                trackImageSrc={this.props.userPlayerInfo.trackImgSrc}
                trackTitle={this.props.userPlayerInfo.trackTitle}
                trackArtists={this.props.userPlayerInfo.trackArtists}
                style={{ paddingTop: '15%' }}
              /> */}
              
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
