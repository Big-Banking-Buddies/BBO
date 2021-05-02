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
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

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
      const dateString = year + '-' + month + '-' + day + 'T10:10:10'
      const to = new Date(dateString);
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
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "75vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h2 style={{ textAlign: 'center' }}>Budget Reset</h2>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Grid>
            <Grid.Row centered>
              <Grid.Column width={10}>
                Amount
                <Input
                    placeholder='Enter Amount (must be integer)'
                    onChange={e => setBudgetAmount(parseInt(e.target.value))}
                    fluid
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={5}>
                Month
                <Input
                    placeholder='MM'
                    onChange={e => setMonth(e.target.value)}
                    fluid
                />
              </Grid.Column>
              <Grid.Column width={5}>
                Day
                <Input
                    placeholder='DD'
                    onChange={e => setDay(e.target.value)}
                    fluid
                />
              </Grid.Column>
              <Grid.Column width={5}>
                Year
                <Input
                    placeholder='YYYY'
                    onChange={e => setYear(e.target.value)}
                    fluid
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>


          <Grid>
            <Grid.Row columns={1} centered>
              <Grid.Column width={10}>
                <Button primary fluid onClick={onSubmit}>Submit</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
  )
}

