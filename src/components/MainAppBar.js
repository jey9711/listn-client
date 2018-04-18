import React, { Component } from 'react';

import SearchBar from './SearchBar';

import AppBar from 'material-ui/AppBar';

import InformationIcon from 'mdi-react/InformationIcon';
import InformationOutlineIcon from 'mdi-react/InformationOutlineIcon';

class MainAppBar extends Component {

  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        titleStyle={{
          paddingTop: '15px',
          paddingLeft: '100px',
          overflow: 'visible',
        }}
        style={{
          backgroundColor: '#191414',
          height: '60px'
        }}
        iconElementRight={
          this.props.isPeopleDrawerOpen
            ?
            <InformationIcon
              color="#cccccc"
              size={30}
              onClick={this.props.handleToggleDrawer}
            />
            :
            <InformationOutlineIcon
              color="#cccccc"
              size={30}
              onClick={this.props.handleToggleDrawer}
            />
        }
        iconStyleRight={{
          paddingTop: '7.5px',
          paddingRight: '15px',
          marginLeft: '20px'
        }}
        title={
          <SearchBar searchDataSource={this.props.searchDataSource} palette={this.props.palette} />
        }
      />
    )
  }
}

export default MainAppBar;