import React, { useState, useEffect } from 'react';
import { Card, Feed, Grid, Image, Button, Progress, Segment, Dimmer, Loader } from "semantic-ui-react";
import { useAuth } from "./Context/AuthContext";
import firebase from "./firebase";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [name, setName] = useState('Joseph Joestar');
  const [budget, setBudget] = useState(2000);
  const [progress, setProgress] = useState(33);
  const [budgetFrom, setBudgetFrom] = useState(Date());
  const [budgetTo, setBudgetTo] = useState(Date());
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    try {
      setError('');
      setLoading(true);
      const db = firebase.firestore();
      const dataA = await db.collection('bankA').get();
      const dataB = await db.collection('bankB').get();
      const balanceA = dataA.docs.find(doc => doc.id === currentUser.email).get("balance");
      const balanceB = dataB.docs.find(doc => doc.id === currentUser.email).get("balance");
      const balance = balanceA + balanceB
      setBalance(balance);
      const profile = await db.collection('profile').get();
      const firstname = profile.docs.find(doc => doc.id === currentUser.email).get("firstname");
      const lastname = profile.docs.find(doc => doc.id === currentUser.email).get("lastname");
      setName(firstname + ' ' + lastname);
      const budget = profile.docs.find(doc => doc.id === currentUser.email).get("budget");
      setBudget(budget);
      const progress = balance < budget ? balance / budget * 100 : 100;
      setProgress(progress);
      const from = profile.docs.find(doc => doc.id === currentUser.email).get("from");
      setBudgetFrom(from);
      const to = profile.docs.find(doc => doc.id === currentUser.email).get("to");
      setBudgetTo(to);
      setLoading(false);
    } catch {
      setError('Unexpected Error Occurs.')
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
      <div style={{ height: '100%', paddingBottom: '50px' }}>
        {loading ?
            <Dimmer active inverted style={{ height: '100%', paddingBottom: '50px' }}>
              <Loader inverted content='Loading'/>
            </Dimmer>
            : <div></div>}
        <Grid>
          <Grid.Row centered columns={2}>
            <Grid.Column width={6} className={'dashboard-box'}>
              <Card fluid>
                <Card.Content textAlign={'center'}>
                  <Card.Header>Account Info</Card.Header>
                </Card.Content>
                <Card.Content textAlign={'left'}>
                  <div style={{ textAlign: 'center' }}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny'
                           circular/>
                  </div>
                  <div>Name: {name}</div>
                  <div>Balance: ${balance}</div>
                  <div>Account: {currentUser.email}</div>
                  <a href={'/update-profile'}><Button fluid primary={true}>Edit Account Info</Button></a>
                  <a href={'/funds'}><Button fluid primary={true} style={{ marginTop: '1em' }}>Manage Funds</Button></a>
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
                              {/*<Feed.Label icon={`${transaction.type === 'withdrawal' ? 'arrow up' : 'arrow down'}`} />*/}
                              <Feed.Content>
                                <Feed.Date content={transaction.timestamp.toDate().toString()}/>
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
                        <li>Budget Set: ${budget}</li>
                        <li>Budget Start
                          Date: {new Date(budgetFrom.seconds * 1000).toLocaleDateString("en-US")}</li>
                        <li>Budget Deadline: {new Date(budgetTo.seconds * 1000).toLocaleDateString("en-US")}</li>
                        {/*<li>Money Saved: $20</li>*/}
                      </ul>
                    </Grid.Column>
                    <Grid.Column textAlign={'center'}>
                      <div>
                        Progress
                        <Progress percent={progress} indicating={true}/>
                        <span>{progress}%</span>
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
