import React, { useContext } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const { currentUser, login, logout, signin, signup } = useAuth();
  const history = useHistory()
  return (
      <div>
        {(currentUser == null) ?
            <Menu>
              <Menu.Item href="/">
                <Header>BBO</Header>
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item href="/login">
                  <Header>Log In</Header>
                </Menu.Item>
                <Menu.Item href="/signup">
                  <Header>Sign Up</Header>
                </Menu.Item>
              </Menu.Menu>

            </Menu>
            :
            <Menu>
              <Menu.Item href="/dash">
                <Header>BBO</Header>
              </Menu.Item>
              <Menu.Item href="/funds">
                <Header>Funds</Header>
              </Menu.Item>
              <Menu.Item href="/wish-list">
                <Header>Wish List</Header>
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item href="/profile">
                  <Header>Profile</Header>
                </Menu.Item>
                <Menu.Item onClick={() => {
                  logout();
                  history.push('/')
                }}>
                  <Header>Log Out</Header>
                </Menu.Item>
              </Menu.Menu>

            </Menu>
        }
      </div>
  )
}