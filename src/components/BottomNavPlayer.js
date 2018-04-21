import React, { Component } from 'react';
import Moment from 'moment';
import 'moment-duration-format';

import BottomNavigation from 'material-ui/BottomNavigation';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';

import { Grid, Row, Col } from 'react-material-responsive-grid';

import Pause from 'mdi-react/PauseIcon'
import Play from 'mdi-react/PlayIcon'
import SkipBackward from 'mdi-react/SkipBackwardIcon'
import SkipForward from 'mdi-react/SkipForwardIcon'

class BottomNavPlayer extends Component {

  render() {

    let formattedSongProgress = `${Moment.duration(this.props.activeTrackProgress, "milliseconds").format("mm:ss", { trim: false })}`,
        formattedSongDuration = `${Moment.duration(this.props.activeTrackDuration, "milliseconds").format("mm:ss", { trim: false })}`;

    return (
      <BottomNavigation style={{
        position: 'absolute',
        bottom: '0',
        width: '99.96%',
        height: '115px',
        background: 'rgba(7,7,7,0)',
        color: '#bbbbbb',
        overflow: 'hidden'
      }}>
        <Grid>
          <Row>
            <Col xs4={4} sm={12} md={12} lg={12} style={{ display: 'table', height: '60px', width: '100%' }}>
              <div style={{
                display: 'table-cell',
                height: '60px',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}>
                <IconButton style={{ padding: 0 }} onClick={() => this.props.handleChangePlaybackState('backward')}>
                  <SkipBackward color="#cccccc" size={40} />
                </IconButton>
                {this.props.isTrackPlaying
                  ? (
                    <IconButton style={{ padding: 0 }} onClick={() => this.props.handleChangePlaybackState('pause')}>
                      <Pause color="#cccccc" size={40} />
                    </IconButton>
                  )
                  :
                  (
                    <IconButton style={{ padding: 0 }} onClick={() => this.props.handleChangePlaybackState('resume')}>
                      <Play color="#cccccc" size={40} />
                    </IconButton>
                  )
                }
                <IconButton style={{ padding: 0 }}onClick={() => this.props.handleChangePlaybackState('forward')}>
                  <SkipForward
                    color="#cccccc"
                    size={40}
                  />
                </IconButton>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs4={4} sm={12} md={12} lg={12} style={{ display: 'table', width: '100%' }}>
              <div style={{
                display: 'table-cell',
                width: '20%',
                verticalAlign: 'middle',
                textAlign: 'right',
              }}>
                {formattedSongProgress}
              </div>
              <div style={{
                display: 'table-cell',
                paddingLeft: '10px',
                paddingRight: '10px',

              }}>
                { this.props.activeTrackProgress >= 0 && 
                  this.props.activeTrackProgress <= this.props.activeTrackDuration 
                  ? (
                      <Slider
                        min={0}
                        max={this.props.activeTrackDuration || 1}
                        step={1}
                        value={this.props.activeTrackProgress}
                        onChange={(e, val) => this.val = val}
                        onDragStop={(e) => this.props.handleChangeProgressSlider(e, this.val)}
                        sliderStyle={{ margin: '20px 0px 20px 0px' }}
                      />
                    )
                  : null
                }
              </div>
              <div style={{
                display: 'table-cell',
                width: '20%',
                verticalAlign: 'middle',
                textAlign: 'left'
              }}>
                {formattedSongDuration}
              </div>
            </Col>
          </Row>
        </Grid>
      </BottomNavigation>
    )
  }
}

export default BottomNavPlayer;