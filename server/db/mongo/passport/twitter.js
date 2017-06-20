import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({ twitter: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.twitter = profile.id;
        user.tokens.push({ kind: 'twitter', accessToken });
        user.profile.name = user.profile.name || profile.username;
        user.profile.picture = user.profile.picture || profile._json.profile_background_image_url;
        user.save((err) => {
          done(err, user, { message: 'Twitter account has been linked.' });
        });
      });
    });
  }
  return User.findOne({ twitter: profile.id }, (findByTwitterIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);

    const user = new User();
    user.username = profile.username;
    user.twitter = profile.id;
    user.tokens.push({ kind: 'twitter', accessToken });
    user.profile.name = profile.displayName;
    user.profile.picture = profile._json.profile_background_image_url;
    return user.save((err) => {
      done(err, user);
    });
  });
};
/* eslint-enable no-param-reassign */
