import React, { useState, useEffect } from 'react';
import { Container, Grid, Dropdown, Icon, Input, Form, TextArea, Button } from "semantic-ui-react";
import firebase from 'firebase';
import { useAuth } from './Context/AuthContext';
import { Alert } from 'react-bootstrap';
import useDropdown from './Components/useDropDown';

export default function ManageFunds() {
  const ref = firebase.firestore().collection("posts");
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [balanceA, setBalanceA] = useState(0);
  const [balanceB, setBalanceB] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);

  const [bankOut, setBankOut] = useState("bankA");
  const [bankIn, setBankIn] = useState("bankB");


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setError('');
      const db = firebase.firestore();
      const dataA = await db.collection(bankOut).get();
      const dataB = await db.collection(bankIn).get();
      const balanceA = dataA.docs.find(doc => doc.id === currentUser.email).get("balance");
      const balanceB = dataB.docs.find(doc => doc.id === currentUser.email).get("balance");
      setBalanceA(balanceA);
      setBalanceB(balanceB);
    } catch{
      setError('Unexpected Error Occurs.')
    }
  }

  const onSubmit = async () => {
    try {
      setError('')
      setMessage('')
      if (bankIn == bankOut){
        setError("Transfer must be between two different banks.")
        return;
      }
      if (transferAmount < 1) {
        setError("Transfer amount must be greater than one dollar.")
        return;
      }
      const db = firebase.firestore();
      const dataA = await db.collection(bankOut).get();
      const dataB = await db.collection(bankIn).get();
      const balanceA = dataA.docs.find(doc => doc.id === currentUser.email).get("balance");
      const balanceB = dataB.docs.find(doc => doc.id === currentUser.email).get("balance");
      const newBalanceA = parseFloat(balanceA) - transferAmount;
      const newBalanceB = parseFloat(balanceB) + transferAmount;
      console.log(newBalanceB)
      if (newBalanceA < 0 || newBalanceB < 0){
        setError("New Balance must be greater than 0.")
        return;
      }
      db.collection(bankOut).doc(currentUser.email).set({balance: newBalanceA});
      db.collection(bankIn).doc(currentUser.email).set({balance: newBalanceB});
      setBalanceA(newBalanceA);
      setBalanceB(newBalanceB);
      setMessage('Successfully transferred $' + transferAmount + ' from ' + bankOut + ' to ' + bankIn + '.');
    } catch{
      setError('Unexpected Error Occurs.')
    }

  }
  const bankOptions = [
    {
      key: 'BankAID',
      text: 'Bank A',
      value: 'bankA',
    },
    {
      key: 'BankBID',
      text: 'Bank B',
      value: 'bankB',
    },
  ]

  return (
      <Container style={{ height: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Transfer Funds</h2>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Grid>
          <Grid.Row columns={3} centered>

            <Grid.Column width={6}>
              Transfer From
              <Dropdown
                  placeholder='Select Bank'
                  fluid
                  selection
                  options={bankOptions}
                  onChange={(e,{value})=> {setBankOut(value); fetchData()}}
              />
            </Grid.Column>
            {/*Available Amount: {bankOut + ' ' + balanceA}*/}

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
                  onChange={(e,{value})=> {setBankIn(value); fetchData()}}
              />
            </Grid.Column>
            {/*Available Amount: {bankIn + ' ' + balanceB}*/}

          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={2} centered>
            <Grid.Column width={7}>
              Amount
              <Input
                  placeholder='Enter Amount (must be integer)'
                  onChange={e => setTransferAmount(parseInt(e.target.value))}
                  fluid
              />
            </Grid.Column>
            {/*{transferAmount}*/}
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

