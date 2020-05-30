const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const port = process.env.PORT || 5000;
const { dbKey, cookieKey } = require('./config/keys');
require('./services/passport');

mongoose.connect(dbKey, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const app = express();

app.use(
	cookieSession({
		maxAge: 86400000,
		keys: [ cookieKey ]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Database connected!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
