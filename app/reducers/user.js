import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as types from '../types'

const isWaitingReducer = {
  [types.MANUAL_LOGIN_USER]: state => state.set('isWaiting', true),
  [types.SIGNUP_USER]: state => state.set('isWaiting', true),
  [types.LOGOUT_USER]: state => state.set('isWaiting', true),

  [types.LOGIN_SUCCESS_USER]: state => state.set('isWaiting', false),
  [types.SIGNUP_SUCCESS_USER]: state => state.set('isWaiting', false),
  [types.LOGOUT_SUCCESS_USER]: state => state.set('isWaiting', false),
  [types.LOGIN_ERROR_USER]: state => state.set('isWaiting', false),
  [types.SIGNUP_ERROR_USER]: state => state.set('isWaiting', false),
  [types.LOGOUT_ERROR_USER]: state => state.set('isWaiting', false),
}

const isLoginreducer = {
  [types.LOGIN_SUCCESS_USER]: state => state.set('isLogin', true),
  [types.SIGNUP_SUCCESS_USER]: state => state.set('isLogin', true),
  [types.LOGOUT_ERROR_USER]: state => state.set('isLogin', true),

  [types.LOGIN_ERROR_USER]: state => state.set('isLogin', false),
  [types.SIGNUP_ERROR_USER]: state => state.set('isLogin', false),
  [types.LOGOUT_SUCCESS_USER]: state => state.set('isLogin', false),
}

const authenticatedReducer = {
  [types.LOGOUT_SUCCESS_USER]: state => state.set('authenticated', false),
}

const defaultState = Immutable.fromJS({
  isLogin: false,
  isWaiting: false,
  message: '',
  json: {},
  authenticated: false,
})

export default createReducer(defaultState, {
  ...isLoginreducer,
  ...isWaitingReducer,
  ...authenticatedReducer,
})
