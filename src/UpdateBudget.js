import React, { useState, useEffect } from 'react';
import { Container, Grid, Dropdown, Icon, Input, Form, TextArea, Button } from "semantic-ui-react";
import firebase from 'firebase';
import { useAuth } from './Context/AuthContext';
import { Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function UpdateBudget() {

  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  // const [balanceA, setBalanceA] = useState(0);
  // const [balanceB, setBalanceB] = useState(0);
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [type, setType] = useState('transfer');

  useEffect(() => {
  }, [])

  const onSubmit = async () => {
    try {
      setError('')
      setMessage('')
      const db = firebase.firestore();
      const profile = await db.collection("profile").get();
      const firstname = profile.docs.find(doc => doc.id === currentUser.email).get("firstname");
      const lastname = profile.docs.find(doc => doc.id === currentUser.email).get("lastname");
      const from = new Date();
      const to = new Date('2021-12-31T10:10:10');
      console.log(from);
      db.collection("profile").doc(currentUser.email).set({
        budget: budgetAmount,
        firstname: firstname,
        lastname: lastname,
        from: from,
        to: to,
      })
      console.log(from)
      setMessage('Successfully set the new budget goal.')
    } catch {
      setError('Unexpected Error Occurs.')
    }

  }

  return (
      <Container style={{ height: '100%', paddingTop: '50px', paddingBottom: '50px', maxWidth: '200px' }}>
        <h2 style={{ textAlign: 'center' }}>Transfer Funds</h2>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Grid>
          <Grid.Row centered>
            <Grid.Column width={16}>
              Amount
              <Input
                  placeholder='Enter Amount (must be integer)'
                  onChange={e => setBudgetAmount(parseInt(e.target.value))}
                  fluid
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>


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

