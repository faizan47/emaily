const passport = require('passport');
const { googleClientId, googleClientSecret } = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
	console.log(user, 'USER');
	done(null, user.id);
});

// Used to decode the received cookie and persist session
passport.deserializeUser(async (id, done) => {
	console.log(id);

	const user = await User.findById(id);
	done(null, user);
});
passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientId,
			clientSecret: googleClientSecret,
			callbackURL: 'http://localhost:5000/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ id: profile.id }).then(existingUser => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({ googleId: profile.id }).save().then(user => done(null, user));
				}
			});
		}
	)
);
