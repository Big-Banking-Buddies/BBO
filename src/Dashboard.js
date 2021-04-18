import React, { useState, useEffect } from 'react';
import {Card, Feed, Grid, Image, Button, Progress} from "semantic-ui-react";
import {useAuth} from "./Context/AuthContext";
import firebase from "./firebase";

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [transactionHistory, setTransactionHistory] = useState([]);

    const init = () => {
        grabTransactionHistory().then(response => {
            let history = response.slice(0, 3);
            setTransactionHistory(history);
        });
    }

    const grabTransactionHistory = async () => {
        const db = firebase.firestore();
        const historyCollection = await db.collection('transferHistory').get();

        return historyCollection.docs.filter(doc => doc.data().account === currentUser.email);
    }
    init();

    return (
        <div style={{height: '100%', paddingBottom: '50px' }}>
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
                                    {
                                        transactionHistory.map((history) => {
                                            let transaction = history.data();
                                            return (
                                                <Feed.Event>
                                                    {/*<Feed.Label icon={`${transaction.type === 'withdrawl' ? 'arrow up' : 'arrow down'}`} />*/}
                                                    <Feed.Content>
                                                        <Feed.Date content={transaction.timestamp.toDate().toString()} />
                                                        <Feed.Summary>
                                                            {`Transferred $${transaction.amount} from ${transaction.bankOut} to ${transaction.bankIn}`}
                                                        </Feed.Summary>
                                                    </Feed.Content>
                                                </Feed.Event>
                                            );
                                        })
                                    }
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
