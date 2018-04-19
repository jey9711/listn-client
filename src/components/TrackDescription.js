import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-material-responsive-grid';

class TrackDescription extends Component {

  render() {

    const artistNames = this.props.activeTrack.artists.map(artists => artists.name).join(", ");
    // const artistNames = this.props.trackArtists.map(artists => artists.name).join(", ");

    return (
      <Grid style={{ textAlign: 'center', ...this.props.style }}>
        <Row>
          <Col xs4={4} sm={12} md={12} lg={12}>
            <img
              src={this.props.activeTrack.album.images[1].url}
              // src={this.props.trackImageSrc}
              width="300px"
              alt=""
            />
            <h4 style={{
              marginTop: '10px',
              marginBottom: '0px',
              color: '#ffffff'
            }}>
              {this.props.activeTrack.name}
              {/* {this.props.trackTitle} */}
            </h4>
            <p style={{
              fontSize: '13.5px',
              color: '#777777'
            }}>
              {artistNames}
            </p>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default TrackDescription;