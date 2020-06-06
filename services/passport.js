const passport = require('passport');
const { googleClientId, googleClientSecret } = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
	console.log(user, 'USER');
	done(null, user.id);
});

// Used to decode the received cookie and persist session
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientId,
			clientSecret: googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				done(null, existingUser);
			} else {
				const user = await new User({ googleId: profile.id }).save();
				done(null, user);
			}
		}
	)
);
