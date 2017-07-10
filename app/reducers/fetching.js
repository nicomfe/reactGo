import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as types from '../types'

const isFetchingReducer = {
  [types.CREATE_REQUEST]: state => state.set('isFetching', true),

  [types.REQUEST_SUCCESS]: state => state.set('isFetching', false),
  [types.REQUEST_FAILURE]: state => state.set('isFetching', false),
}

const defaultState = Immutable.fromJS({ isFetching: false })

export default createReducer(defaultState, {
  ...isFetchingReducer,
})
