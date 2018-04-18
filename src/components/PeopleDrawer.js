import React, { Component } from 'react';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';

class PeopleDrawer extends Component {

  // constructor(props) {
  //   super(props);
  // }

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
      </Drawer>
    )
  }
}

export default PeopleDrawer;