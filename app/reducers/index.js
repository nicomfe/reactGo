import { combineReducers } from 'redux-immutablejs'
import { routerReducer } from 'react-router-redux'

import user from './user'
import fetching from './fetching'
import messages from './messages'

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  fetching,
  user,
  messages,
  routing: routerReducer,
})

export default rootReducer
