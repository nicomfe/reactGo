import User from '../models/user'

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({ google: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, {
          message: 'There is already a Google account that belongs to you.',
        })
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.google = profile.id
        user.tokens.push({ kind: 'google', accessToken })
        user.profile.name = user.profile.name || profile.displayName
        user.profile.gender = user.profile.gender || profile._json.gender
        user.profile.picture = user.profile.picture || profile._json.picture
        user.save((err) => {
          done(err, user, { message: 'Google account has been linked.' })
        })
      })
    })
  }
  return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser)
    return User.findOne({ email: profile._json.emails[0].value }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, {
          message: 'There is already an account using this email address.',
        })
      }
      const user = new User()
      user.email = profile._json.emails[0].value
      user.google = profile.id
      user.tokens.push({ kind: 'google', accessToken })
      user.profile.name = profile.displayName
      user.profile.gender = profile._json.gender
      user.profile.picture = profile._json.picture
      return user.save((err) => {
        done(err, user)
      })
    })
  })
}
/* eslint-enable no-param-reassign */
