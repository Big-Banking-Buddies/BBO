import React, { Component } from 'react';
import { Grid, Image, Button} from 'semantic-ui-react'

var titleStyle= {
  fontFamily: "Ubuntu",
  fontSize: 30,
  paddingTop: 100,
}

var bboStyle= {
  fontFamily: "Ubuntu",
  fontSize: 40,
  color: "#7CA6ED",
}

var subtitleStyle = {
  fontFamily: "Ubuntu",
  paddingTop: 10,
  paddingBottom: 20,
  fontWeight: 200,
}

var buttonStyle ={
  background: "#7CA6ED",
}

class LandingPage extends Component {

  render() {
    return (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={6}>
              <h1 style={titleStyle}>Let's Work With</h1>
              <h1 style={bboStyle}>BBO</h1>
              <h3 style={subtitleStyle}>We help you organize bank information and financial changes. <br/> Join today and manage your money like an elite!</h3>
              <Button primary href="auth.html" style={buttonStyle}>Get Started</Button>

            </Grid.Column>
            <Grid.Column width={8}>
              <Image src='/img/home.svg'></Image>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default LandingPage;