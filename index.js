const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const port = process.env.PORT || 5000;
const { dbKey, cookieKey } = require('./config/keys');
const bodyParser = require('body-parser');
require('./services/passport');

mongoose.connect(dbKey, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const app = express();
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 86400000,
		keys: [ cookieKey ]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);
require('./routes/payment')(app);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Database connected!');
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');

	app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));
}

app.listen(port, () => console.log(`Listening on port ${port}`));
