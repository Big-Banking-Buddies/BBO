import React from 'react';
import { Grid, Icon, Label } from 'semantic-ui-react';

function Footer() {
  const divStyle = { paddingTop: '15px', paddingBottom: '15px' };
  return (
      <footer style={{ background: 'black', color: 'white' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <h2>Main</h2>
              <Label>About</Label>
              <Label>FAQ</Label>
            </Grid.Column>
            <Grid.Column width={6}>
              <h2>Links</h2>
              <Label>FAQ</Label>
              <Label>Privacy Policy</Label>
            </Grid.Column>
            <Grid.Column width={6}>
              <h2>Contact Info</h2>
              <Icon name='twitter'/>
              <Icon name='facebook' />
              <Icon name='instagram' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div style={divStyle} className="ui center aligned container">
          BBO is a student project under the University of Hawaii at Manoa Spring 2021. <br/>
          This project aims to explore cyber security techniques, and as such this website shouldn't <br/>
          be taken seriously with real personal information. <br/>
          University of Hawaii<br/>
          Honolulu, HI 96826<br/>
          <a href="./home.html">Home</a>
        </div>
      </footer>
  );
}

export default Footer;