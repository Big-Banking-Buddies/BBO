import React, { useState, useEffect } from 'react';
import { Container, Grid, Dropdown, Icon, Input, Form, TextArea, Button } from "semantic-ui-react";
import firebase from 'firebase';
import { useAuth } from './Context/AuthContext';

export default function ManageFunds() {
  const ref = firebase.firestore().collection("posts");
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth()
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection("bankA").get()
      setBalance(data.docs.find(doc => doc.id === currentUser.uid).get("balance"))
    }
    fetchData()
  }, [])

  const onSubmit = () => {
    const db = firebase.firestore()
    db.collection("bankA").doc(currentUser.uid).set({balance: 100})
    setBalance(100)
  }
  const bankOptions = [
    {
      key: 'BankAID',
      text: 'Bank A',
      value: 'BankAID',
    },
    {
      key: 'BankBID',
      text: 'Bank B',
      value: 'BankBID',
    },
  ]

  return (
      <Container style={{ height: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Transfer Funds</h2>
        <Grid>
          <Grid.Row columns={3} centered>
            <Grid.Column width={6}>
              Transfer From
              <Dropdown
                  placeholder='Select Bank'
                  fluid
                  selection
                  options={bankOptions}
              />
            </Grid.Column>
            <Grid.Column width={2} textAlign={'center'} style={{ fontSize: '20px', padding: '0.5em' }}>
              To <br/>
              <Icon name={'arrow right'}></Icon>
            </Grid.Column>
            <Grid.Column width={6}>
              Transfer To
              <Dropdown
                  placeholder='Select Bank'
                  fluid
                  selection
                  options={bankOptions}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={2} centered>
            <Grid.Column width={7}>
              Amount
              <Input
                  placeholder='Enter Amount'
                  fluid
              />
            </Grid.Column>
            <Grid.Column width={7}>
              Date to Transfer
              <Input
                  placeholder='MM/DD/YYYY'
                  fluid
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={1} centered>
            <Grid.Column width={14}>
              Note
              <Form>
                <TextArea placeholder='Leave a note for yourself about this transfer'/>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>


        {balance}

        <Grid>
          <Grid.Row columns={1} centered>
            <Grid.Column width={14}>
              <Button primary fluid onClick={onSubmit}>Submit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
  )
}

