// Reference: https://youtu.be/PKwu15ldZ7k
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom';
import firebase from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const initialBalance = 100;
  const firstname = 'Joseph';
  const lastname = 'Joestar';
  const from = new Date();
  const to = new Date();
  const budget = 1000;

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      const db = firebase.firestore();
      // set initial balance and history
      db.collection('bankA').doc(emailRef.current.value).set({balance: initialBalance});
      db.collection('bankB').doc(emailRef.current.value).set({balance: initialBalance});
      db.collection('profile').doc(emailRef.current.value).set({
        firstname: firstname,
        lastname: lastname,
        budget: budget,
        from: from,
        to: to
      });
      db.collection("transferHistory").doc(uuidv4()).set({
        account: emailRef.current.value,
        amount: initialBalance,
        bankOut: 'big-buddy-bank',
        bankIn: 'bankA',
        timestamp: new Date(),
        note: 'Here is the gift from Big Buddy Bank, hope you enjoy :)'
      })
      db.collection("transferHistory").doc(uuidv4()).set({
        account: emailRef.current.value,
        amount: initialBalance,
        bankOut: 'big-buddy-bank',
        bankIn: 'bankB',
        timestamp: new Date(),
        note: 'Here is the gift from Big Buddy Bank, hope you enjoy :)'
      })
      history.push("/dash")
    } catch {
      setError('Failed to create an account')
      setLoading(false)
    }
  }

  return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "75vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>

              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login"> Log In </Link>
          </div>
        </div>
      </Container>
  )
}
