import { combineReducers } from 'redux-immutablejs'
import { routerReducer } from 'react-router-redux'

import user from './user'
import fetching from './fetching'

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  fetching,
  user,
  routing: routerReducer,
})

export default rootReducer
