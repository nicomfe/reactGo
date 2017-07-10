import Twitter from 'twitter'
import { twitter as twitterConfig } from '../../config/secrets'

const TwitterClient = new Twitter({
  consumer_key: twitterConfig.clientID,
  consumer_secret: twitterConfig.clientSecret,
  access_token_key: twitterConfig.accessToken,
  access_token_secret: twitterConfig.accessTokenSecret,
})

export function all(req, res) {
  return Promise.all([
    new Promise((resolve, reject) => {
      TwitterClient.get('direct_messages', {}, (error, messages) => {
        if (error) {
          reject(error)
        }
        resolve(messages)
      })
    }),
    new Promise((resolve, reject) => {
      TwitterClient.get('direct_messages/sent', {}, (error, messages) => {
        if (error) {
          reject(error)
        }
        resolve(messages)
      })
    }),
  ]).then((data) => {
    return res.send(data[0].concat(data[1]))
  })
}

export function getReceived(req, res) {
  return TwitterClient.get('direct_messages', {}, (error, messages) => {
    if (error) {
      res.status(500).send(error)
    }
    res.send({ received: messages })
  })
}

export function getSent(req, res) {
  return TwitterClient.get('direct_messages/sent', {}, (error, messages) => {
    if (error) {
      res.status(500).send(error)
    }
    res.send({ received: messages })
  })
}
