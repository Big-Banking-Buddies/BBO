import React from 'react';
import { Menu, Header } from 'semantic-ui-react';

function NavBar() {
  return(
      <Menu>
        <Menu.Item  href="/dash">
          <Header>BBO</Header>
        </Menu.Item>
        <Menu.Item  href="/funds">
          <Header>Funds</Header>
        </Menu.Item>
        <Menu.Item  href="/">
          <Header>Profile</Header>
        </Menu.Item>
        <Menu.Item  href="/wish-list">
          <Header>Wish List</Header>
        </Menu.Item>
        <Menu.Item  href="/history">
          <Header>History</Header>
        </Menu.Item>
      </Menu>
  );

} export default NavBar;