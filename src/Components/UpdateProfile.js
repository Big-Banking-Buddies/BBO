// Reference: https://youtu.be/PKwu15ldZ7k
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../Context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from '../firebase';

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.")
    }


    const promises = []
    setLoading(true)
    setError("")

    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updateEmail(emailRef.current.value))
    // }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    const db = firebase.firestore();
    const profile = await db.collection("profile").get();
    const budgetAmount = await profile.docs.find(doc => doc.id === currentUser.email).get("budget");
    let firstname = await profile.docs.find(doc => doc.id === currentUser.email).get("firstname");
    let lastname = await profile.docs.find(doc => doc.id === currentUser.email).get("lastname");

    if (firstnameRef.current.value) {
      firstname = firstnameRef.current.value;
    }
    if (lastnameRef.current.value) {
      lastname = lastnameRef.current.value;
    }
    const from = await profile.docs.find(doc => doc.id === currentUser.email).get("from");
    const to = await profile.docs.find(doc => doc.id === currentUser.email).get("to");

    db.collection("profile").doc(currentUser.email).set({
      budget: budgetAmount,
      firstname: firstname,
      lastname: lastname,
      from: from,
      to: to,
    })


    Promise.all(promises)
        .then(() => {
          history.push("/dash")
        })
        .catch(() => {
          setError("Failed to update account")
        })
        .finally(() => {
          setLoading(false)
        })
  }

  return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "75vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>

                <Form.Group id="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                      type="firstname"
                      ref={firstnameRef}
                      placeholder="Leave blank to keep the same"
                  />
                </Form.Group>

                <Form.Group id="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                      type="lastname"
                      ref={lastnameRef}
                      placeholder="Leave blank to keep the same"
                  />
                </Form.Group>


                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </Container>
  )
}