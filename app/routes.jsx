import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, Dashboard, About, LoginOrRegister, Home } from './pages'

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const state = store.getState()
    if (!state.getIn(['user', 'authenticated'])) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      })
    }
    callback()
  }

  const redirectAuth = (nextState, replace, callback) => {
    const state = store.getState()
    if (state.getIn(['user', 'authenticated'])) {
      replace({
        pathname: '/',
      })
    }
    callback()
  }
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="about" component={About} />
    </Route>
  )
}
