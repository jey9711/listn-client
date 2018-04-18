import React, { Component } from 'react';

import Moment from 'moment';
import 'moment-duration-format';

import BottomNavigation from 'material-ui/BottomNavigation';
import Slider from 'material-ui/Slider';

class BottomNavPlayer extends Component {

  render() {

    let formattedSongProgress = `${Moment.duration(this.props.songProgress, "milliseconds").format("mm:ss", { trim: false })}`,
        formattedSongDuration = `${Moment.duration(this.props.songDuration, "milliseconds").format("mm:ss", { trim: false })}`;

    return (
      <BottomNavigation style={{
        position: 'absolute',
        bottom: '0',
        width: '99.96%',
        display: 'table',
        backgroundColor: '#191414',
        color: '#bbbbbb',
      }}>
        <div style={{
          display: 'table-cell',
          width: '60px',
          verticalAlign: 'middle',
          textAlign: 'center',
        }}>
          {formattedSongProgress}
        </div>
        <div style={{
          display: 'table-cell',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}>
          <Slider
            min={0}
            max={this.props.songDuration}
            step={1}
            value={this.props.songProgress}
            onChange={this.props.handleSlider}
            sliderStyle={{ margin: '20px 0px' }}
          />
        </div>
        <div style={{
          display: 'table-cell',
          width: '60px',
          verticalAlign: 'middle',
          textAlign: 'center'
        }}>
          {formattedSongDuration}
        </div>
      </BottomNavigation>
    )
  }
}

export default BottomNavPlayer;