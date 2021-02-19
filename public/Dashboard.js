import React from 'react';
import {Container, Grid} from "semantic-ui-react";


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
                        <Grid.Column width={7} textAlign={'center'} className={'dashboard-box'}>
                            <h3>
                                Account Info (Balance, etc.)
                            </h3>
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                        <Grid.Column width={7} textAlign={'center'} className={'dashboard-box'}>
                            <h3>
                                Recent Transaction History
                            </h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered columns={1}>
                        <Grid.Column width={15} textAlign={'center'} className={'dashboard-box'}>
                            <h3>
                                Budget Tracker
                            </h3>
                            <Grid columns={'equal'}>
                                <Grid.Column textAlign={'left'}>
                                    <h5>
                                        Budget Info
                                    </h5>
                                    <ul>
                                        <li>Budget Set: $1000</li>
                                        <li>Budget Deadline: 2/18/2021</li>
                                    </ul>
                                </Grid.Column>
                                <Grid.Column textAlign={'center'}>
                                    Graph
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
