import React, { Component } from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';

import MagnifyIcon from 'mdi-react/MagnifyIcon';

class SearchBar extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Paper style={{
        maxWidth: '250px',
        height: '30px',
        borderRadius: '20px',
        lineHeight: '0px'
      }}>
        <MagnifyIcon
          color="#cccccc"
          style={{
            width: '16px',
            marginTop: '5px',
            marginLeft: '10px',
            float: 'left',
          }}
        />
        <AutoComplete
          hintText="Search"
          dataSource={this.props.searchDataSource}
          style={{
            height: '90%',
            width: '70%',
            marginLeft: '10px',
            bottom: '13px',
            fontSize: '10px'
          }}
          menuStyle={{
            width: '70%',
          }}
          underlineStyle={{
            width: '70%',
          }}
          underlineFocusStyle={{
            borderColor: this.props.palette.darkVibrant
          }}
          hintStyle={{
            fontSize: '15px',
            bottom: '7.5px'
          }}
          inputStyle={{
            fontSize: '15px',
            bottom: '-3.5px',
            width: '70%'
          }}
        />
      </Paper>
    )
  }
}

export default SearchBar;