// Reference: https://youtu.be/PKwu15ldZ7k
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from '../Context/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  // if there is no current user, redirect to the landing page
  return (
      <Route
          {...rest}
          render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/landing" />
          }}
      ></Route>
  )
}