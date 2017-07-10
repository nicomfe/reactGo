import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as types from '../types'

const getMessagesReducer = {
  [types.GET_ALL_MESSAGES_SUCCESS]: (state, action) => {
    const { payload } = action
    const messages = payload.data.entities.message
    return state.mergeIn(['all'], Immutable.fromJS(messages))
  },
}

const defaultState = Immutable.fromJS({
  all: {},
})

export default createReducer(defaultState, {
  ...getMessagesReducer,
})
