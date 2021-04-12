import React from 'react';
import {Card, Feed, Grid, Image, Button, Progress} from "semantic-ui-react";


class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
        }
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <Grid>
                    <Grid.Row centered columns={2}>
                        <Grid.Column width={6} className={'dashboard-box'}>
                            <Card fluid>
                                <Card.Content textAlign={'center'}>
                                    <Card.Header>Account Info</Card.Header>
                                </Card.Content>
                                <Card.Content textAlign={'left'}>
                                    <div style={{textAlign: 'center'}}>
                                        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny' circular />
                                    </div>
                                    <div>Name: John Doe</div>
                                    <div>Balance: $20</div>
                                    <div>Account Number: XXXX-XXXX-XXXX-1234</div>
                                    <a href={'/update-profile'}><Button fluid primary={true}>Edit Account Info</Button></a>
                                    <a href={'/funds'}><Button fluid primary={true} style={{marginTop: '1em'}}>Manage Funds</Button></a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                        <Grid.Column width={6} textAlign={'center'} className={'dashboard-box'}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>Recent Transaction History</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Feed>
                                        <Feed.Event>
                                            <Feed.Label image='' />
                                            <Feed.Content>
                                                <Feed.Date content='1 day ago' />
                                                <Feed.Summary>
                                                    Withdrew funds from XXXX to XXXX
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>

                                        <Feed.Event>
                                            <Feed.Label image='' />
                                            <Feed.Content>
                                                <Feed.Date content='3 days ago' />
                                                <Feed.Summary>
                                                    Deposited Funds from YYYY to YYYY
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>

                                        <Feed.Event>
                                            <Feed.Label image='' />
                                            <Feed.Content>
                                                <Feed.Date content='4 days ago' />
                                                <Feed.Summary>
                                                    Deposited funds from XXXX to YYYY
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>
                                    </Feed>
                                </Card.Content>
                                <Card.Content>
                                    <a href={'/history'}>
                                        <Button fluid primary={true}>View Full History</Button>
                                    </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered columns={1}>
                        <Grid.Column width={13} textAlign={'center'} className={'dashboard-box'}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>Budget Tracker</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Grid columns={'equal'}>
                                        <Grid.Column textAlign={'left'}>
                                            <h5>
                                                Budget Info
                                            </h5>
                                            <ul>
                                                <li>Budget Set: $1000</li>
                                                <li>Budget Start Date: 2/01/2021</li>
                                                <li>Budget Deadline: 2/18/2021</li>
                                                <li>Money Saved: $20</li>
                                            </ul>
                                        </Grid.Column>
                                        <Grid.Column textAlign={'center'}>
                                            <div>
                                                Progress
                                                <Progress percent={33} indicating={true}/>
                                                <span>33%</span>
                                            </div>
                                        </Grid.Column>
                                    </Grid>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
