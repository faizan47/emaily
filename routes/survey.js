const isLoggedIn = require('../middleware/isLoggedIn');
const hasCredits = require('../middleware/hasCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const sendEmail = require('../services/Mailer');

module.exports = app => {
	app.post('/api/surveys', isLoggedIn, hasCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		try {
			await sendEmail(survey, surveyTemplate(survey));
			req.user.credits -= 1;
			await req.user.save();
			res.send(req.user);
		} catch (error) {
			res.status(405).send(`Something went wrong. ${error}`);
		}
	});
};

// recipients = 'fzn9898@gmail.com,fzn9898+sendgrid@gmail.com';
// response = axios
// 	.post('/api/surveys', {
// 		title: 'HELLO WORLD!',
// 		subject: 'A boriing subject',
// 		body: 'this is THE BODY',
// 		recipients
// 	})
// 	.then(res => console.log(res));
