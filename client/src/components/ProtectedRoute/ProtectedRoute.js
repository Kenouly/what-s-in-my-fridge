import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  console.log({ component: Component, user, ...rest })
  return (
    <Route render={() => user ? <Component {...rest} /> : <Redirect to='/login' />} />
  )
}

export default ProtectedRoute
