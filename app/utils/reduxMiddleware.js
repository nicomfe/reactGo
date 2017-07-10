/**
 * Middlewares
 * Please read http://redux.js.org/docs/advanced/Middleware.html for more details
 *
 **/
import { normalize } from 'normalizr'
// import { showProgress, hideProgress } from '../progress/actions'
// import { pushNotification } from '../notifications/actions'

// actions
// import { logout } from '../oauth/actions'
// import * as notificationActions from '../notifications/actions'
// This middleware handles all the fetch requests
// Dispatching a request action and then either a success or failure action
const fetch = store => next => (action) => {
  if (!action.meta || !action.meta.fetch) {
    return next(action)
  }

  if (action.meta.shouldFetch) {
    const alreadyFetchedValue = action.meta.shouldFetch(store.getState())
    if (alreadyFetchedValue) {
      return alreadyFetchedValue
    }
  }

  if (Array.isArray(action.types) === false && action.types.length === 3) {
    throw new Error('action.types must be an array of 3 action types')
  }

  const [REQUEST, SUCCESS, FAILURE] = action.types
  const { payload = {} } = action

  // dispatch request action
  next({ type: REQUEST, payload })
  // dispatchProgressAction(action, true, store)
  return action.meta.fetch().then((response) => {
    let value = response
    if (value.error) {
      throw value.error
    }
    // dispatch success
    // if (action.meta.notification && action.meta.notification.success) {
    //   next(notificationActions.showSuccess(action.meta.notification.success))
    // }
    // dispatchProgressAction(action, false, store)
    if (action.meta.normalize && response.data) {
      value = normalize(response.data, action.meta.normalize)
    }
    next({ type: SUCCESS, payload: { data: value, ...payload } })
    // if (action.meta.pushUrl) {
    //   store.dispatch(push(action.meta.pushUrl))
    // }
    return value
  }, (error) => {
    throw error
  })
  .catch((error) => {
    // if we dont log anything the real error will get missed
    // and console will only show <Cannot read property 'getHostNode' of null>
    console.error(error)
    if (error.response) {
      error.response.then((errorData) => {
        // if (error.status === 401) {
        //   logoutIfNeeded(error, store)
        //   // dispatch failure
        // }
        next({
          type: FAILURE,
          error: {
            status: error.status,
            data: errorData,
          },
          payload,
        })
        // if (action.meta.notification && action.meta.notification.error) {
        //   store.dispatch(notificationActions.showError(errorData.error_description))
        // }
      })
    }
  })
}

// function logoutIfNeeded(error, store) {
//   // if we get a 401 at this point means that refresh token didnt work
//   if (error.status === 401) {
//     store.dispatch(logout())
//   }
// }

// function dispatchProgressAction(action, show, store) {
//   if (action.meta.showProgress) {
//     if (show) {
//       store.dispatch(showProgress())
//     } else {
//       store.dispatch(hideProgress())
//     }
//   }
// }

export default fetch
