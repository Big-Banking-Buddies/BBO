import React, { useState, useEffect } from 'react';
import { Container, Grid, Dropdown, Icon, Input, Form, TextArea, Button } from "semantic-ui-react";
import firebase from 'firebase';
import { useAuth } from './Context/AuthContext';
import { Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function ManageFunds() {

  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  // const [balanceA, setBalanceA] = useState(0);
  // const [balanceB, setBalanceB] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [note, setNote] = useState('');

  const [bankOut, setBankOut] = useState('');
  const [bankIn, setBankIn] = useState('');
  const [type, setType] = useState('transfer');

  useEffect(() => {
  }, [])

  // const fetchData = async () => {
  //   try {
  //     setError('');
  //     const db = firebase.firestore();
  //     const dataA = await db.collection(bankOut).get();
  //     const dataB = await db.collection(bankIn).get();
  //     const balanceA = dataA.docs.find(doc => doc.id === currentUser.email).get("balance");
  //     const balanceB = dataB.docs.find(doc => doc.id === currentUser.email).get("balance");
  //     setBalanceA(balanceA);
  //     setBalanceB(balanceB);
  //   } catch{
  //     setError('Unexpected Error Occurs.')
  //   }
  // }

  const onSubmit = async () => {
    try {
      setError('')
      setMessage('')
      if (!(type === 'withdrawal' || type === 'deposit' || type === 'transfer')) {
        setError('Please select a method.')
        return;
      }

      if (type === 'transfer') {
        if (bankIn === '' || bankOut === '') {
          setError("Please select banks.")
          return;
        }
        if (bankIn === bankOut) {
          setError("Transfer must be between two different banks.")
          return;
        }
      } else {
        if (bankIn === '' && type === 'deposit') {
          setError('Please select a bank.')
          return;
        }
      }
      if (transferAmount < 1) {
        setError("Transfer amount must be greater than one dollar.")
        return;
      }
      if (transferAmount > 1000000000000) {
        setError("Why are you so rich?")
        return;
      }

      const db = firebase.firestore();

      if (type === 'transfer') {
        const dataA = await db.collection(bankOut).get();
        const dataB = await db.collection(bankIn).get();
        const balanceA = dataA.docs.find(doc => doc.id === currentUser.email).get("balance");
        const balanceB = dataB.docs.find(doc => doc.id === currentUser.email).get("balance");
        const newBalanceA = parseFloat(balanceA) - transferAmount;
        const newBalanceB = parseFloat(balanceB) + transferAmount;
        if (newBalanceA < 0 || newBalanceB < 0) {
          setError("New Balance must be greater than 0.")
          return;
        }
        if (balanceA + balanceB !== newBalanceA + newBalanceB) {
          setError("Malicious behavior detected. Please call 911 for more details.")
          return;
        }
        db.collection(bankOut).doc(currentUser.email).set({ balance: newBalanceA });
        db.collection(bankIn).doc(currentUser.email).set({ balance: newBalanceB });
        // setBalanceA(newBalanceA);
        // setBalanceB(newBalanceB);
        db.collection("transferHistory").doc(uuidv4()).set({
          account: currentUser.email,
          amount: transferAmount,
          bankOut: bankOut,
          bankIn: bankIn,
          type: type,
          timestamp: new Date(),
          note: note
        })
        setMessage('Successfully transferred $' + transferAmount + ' from ' + bankOut + ' to ' + bankIn + '.');
      }

      if (type === 'withdrawal') {
        const dataA = await db.collection(bankOut).get();
        const balanceA = dataA.docs.find(doc => doc.id === currentUser.email).get("balance");
        const newBalanceA = parseFloat(balanceA) - transferAmount;
        if (newBalanceA < 0) {
          setError("You can't withdraw more than your balance in this account.");
          return;
        }
        if (newBalanceA > balanceA) {
          setError("Integer Overflow Error.");
          return;
        }
        db.collection(bankOut).doc(currentUser.email).set({ balance: newBalanceA });
        // setBalanceA(newBalanceA);
        db.collection("transferHistory").doc(uuidv4()).set({
          account: currentUser.email,
          amount: transferAmount,
          bankOut: bankOut,
          bankIn: '',
          type: type,
          timestamp: new Date(),
          note: note
        })
        setMessage('Successfully withdrawn $' + transferAmount + ' from ' + bankOut + '.');
      }

      if (type === 'deposit') {
        const dataB = await db.collection(bankIn).get();
        const balanceB = dataB.docs.find(doc => doc.id === currentUser.email).get("balance");
        const newBalanceB = parseFloat(balanceB) + transferAmount;
        if (newBalanceB < balanceB) {
          setError("Integer Overflow Error.");
          return;
        }
        db.collection(bankIn).doc(currentUser.email).set({ balance: newBalanceB });
        // setBalanceA(newBalanceA);
        // setBalanceB(newBalanceB);
        db.collection("transferHistory").doc(uuidv4()).set({
          account: currentUser.email,
          amount: transferAmount,
          bankOut: '',
          bankIn: bankIn,
          type: type,
          timestamp: new Date(),
          note: note
        })
        setMessage('Successfully deposited $' + transferAmount + ' to ' + bankIn + '.');
      }

    } catch {
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

  const methodOptions = [
    {
      key: 'MethodAID',
      text: 'Transfer',
      value: 'transfer'
    },
    {
      key: 'MethodBID',
      text: 'Withdrawal',
      value: 'withdrawal'
    },
    {
      key: 'MethodCID',
      text: 'Deposit',
      value: 'deposit'
    }
  ]

  return (
      <Container style={{ height: '100%', paddingTop: '50px', paddingBottom: '50px' }}>
        <h2 style={{ textAlign: 'center' }}>Transfer Funds</h2>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              Method
              <Dropdown
                  placeholder='Select Method'
                  fluid
                  selection
                  options={methodOptions}
                  onChange={(e, { value }) => setType(value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3} centered>
            {type === 'transfer' || type === 'withdrawal' ?
                <Grid.Column width={6}>
                  From
                  <Dropdown
                      placeholder='Select Bank'
                      fluid
                      selection
                      options={bankOptions}
                      onChange={(e, { value }) => setBankOut(value)}
                  />
                </Grid.Column> :
                <div></div>
            }

            {type === 'transfer' ?
                <Grid.Column width={2} textAlign={'center'} style={{ fontSize: '20px', padding: '0.5em' }}>
                  To <br/>
                  <Icon name={'arrow right'}></Icon>
                </Grid.Column> :
                <div></div>
            }

            {type === 'transfer' || type === 'deposit' ?
                <Grid.Column width={6}>
                  To
                  <Dropdown
                      placeholder='Select Bank'
                      fluid
                      selection
                      options={bankOptions}
                      onChange={(e, { value }) => setBankIn(value)}
                  />
                </Grid.Column>
                : <div></div>
            }

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
              {/*Date to Transfer*/}
              {/*<Input*/}
              {/*    placeholder='MM/DD/YYYY'*/}
              {/*    fluid*/}
              {/*/>*/}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={1} centered>
            <Grid.Column width={14}>
              Note
              <Form>
                <TextArea
                    placeholder='Leave a note for yourself about this transfer'
                    onChange={(e, { value }) => setNote(value)}
                />
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

