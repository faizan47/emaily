const key = require('../config/keys');
const isLoggedIn = require('../middleware/isLoggedIn');
const stripe = require('stripe')(key.StriplePrivKey);

module.exports = app => {
	app.post('/api/stripe', isLoggedIn, async (req, res) => {
		await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: '5 email credits for $5'
		});
		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};
