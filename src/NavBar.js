import React from 'react';
import { Menu, Header } from 'semantic-ui-react';

function NavBar() {
  return(
      <Menu>
        <Menu.Item>
          <Header>BBO</Header>
        </Menu.Item>
        <Menu.Item>
          <Header>Login</Header>
        </Menu.Item>
      </Menu>
  );

} export default NavBar;