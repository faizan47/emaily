const passport = require('passport');

module.exports = app => {
	app.get('/auth/google/', passport.authenticate('google', { scope: [ 'profile' ] }));

	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
		// Successful authentication, redirect home.
		res.redirect('/');
	});

	app.get('/', (req, res) => {
		console.log(req.user);
		req.user
			? res.send('You are now logged in!<br><a href="/api/logout">Log Out</a>')
			: res.send('You are logged out!<br><a href="/auth/google">Log in</a>');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};
