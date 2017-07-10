/**
 * Routes for express app
 */
// import Twitter from 'twitter'
import passport from 'passport'
import unsupportedMessage from '../db/unsupportedMessage'
import { controllers, passport as passportConfig } from '../db'
import * as messagesApi from '../api/messages'
// import { twitter as twitterConfig } from '../../config/secrets'


const usersController = controllers && controllers.users
const topicsController = controllers && controllers.topics

// const TwitterClient = new Twitter({
//   consumer_key: twitterConfig.clientID,
//   consumer_secret: twitterConfig.clientSecret,
//   access_token_key: twitterConfig.accessToken,
//   access_token_secret: twitterConfig.accessTokenSecret,
// })

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/sessions', usersController.login)
    app.post('/users', usersController.signUp)
    app.delete('/sessions', usersController.logout)
  } else {
    console.warn(unsupportedMessage('users routes'))
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }))

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login',
      })
    )
  }

  if (passportConfig && passportConfig.twitter) {
    // twitter auth
    // Redirect the user to Twitter for authentication. When complete, Twitter
    // will redirect the user back to the application at
    // /auth/twitter/return
    app.get('/auth/twitter', passport.authenticate('twitter'))

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login',
      })
    )
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all)
    app.post('/topic/:id', topicsController.add)
    app.put('/topic/:id', topicsController.update)
    app.delete('/topic/:id', topicsController.remove)
  } else {
    console.warn(unsupportedMessage('topics routes'))
  }

  // API HOST: https://api.twitter.com/1.1/direct_messages/events/list.json
  // DOCS:  https://dev.twitter.com/rest/reference/get/direct_messages/events/list

  if (messagesApi) {
    app.get('/api/twitter/messages', messagesApi.all)
    app.get('/api/twitter/messages/received', messagesApi.getReceived)
    app.get('/api/twitter/messages/sent', messagesApi.getSent)
  }
}
