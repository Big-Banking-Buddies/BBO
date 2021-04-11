import React from 'react';
import { Grid, List } from 'semantic-ui-react';

function Footer() {
  return (
      <footer style={{ background: 'black', color: 'white', width: '100%', bottom: '0', padding: '25px 100px 25px 100px', alignContent: 'center' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <h2>Main</h2>
              <List>
                <List.Item>
                  <List.Icon name='home'/>
                  <List.Content>Home</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='group'/>
                  <List.Content>About</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='question circle'/>
                  <List.Content>FAQ</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <h2>Links</h2>
              <List>
                <List.Item>
                  <List.Content>FAQ</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>Privacy Policy</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <h2>Contact Us</h2>
              <List>
                <List.Item>
                  <List.Content>Mail: 123 Campus Rd, Honolulu, HI 96822</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>Email: bbo@professionalemal.com</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='twitter'/>
                  <List.Icon name='facebook' />
                  <List.Icon name='instagram' />
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <div className="ui center aligned container">
          BBO is a student project under the University of Hawaii at Manoa Spring 2021. <br/>
          This project aims to explore cyber security techniques, and as such this website shouldn't <br/>
          be taken seriously with real personal information. <br/>
          University of Hawaii<br/>
          Honolulu, HI 96826<br/>
          <a href="./home.html">Home</a>
        </div> */}
      </footer>
  );
}

export default Footer;