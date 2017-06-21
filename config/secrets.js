export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here'
export const google = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
}

export const twitter = {
  clientID: process.env.TWITTER_KEY,
  clientSecret: process.env.TWITTER_SECRET,
  callbackURL: '/auth/twitter/callback',
}
