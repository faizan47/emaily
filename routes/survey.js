const isLoggedIn = require('../middleware/isLoggedIn');
const hasCredits = require('../middleware/hasCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const sendEmail = require('../services/Mailer');
const { Path } = require('path-parser');
const { uniqBy } = require('lodash');

module.exports = app => {
	app.get('/api/surveys', isLoggedIn, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });
		res.send(surveys);
	});

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
			await survey.save();
			await sendEmail(survey, surveyTemplate(survey));
			req.user.credits -= 1;
			await req.user.save();
			res.send(req.user);
		} catch (error) {
			console.log(error);
			res.status(405).send(`Something went wrong. ${error}`);
		}
	});
	let hookArray = [];
	app.post('/api/surveys/webhook', (req, res) => {
		const { URL } = require('url');
		const path = new Path('/api/surveys/:surveyId/:choice');
		req.body.map(({ email, url }) => {
			const match = path.test(new URL(url).pathname);
			if (match) return hookArray.push({ email, surveyId: match.surveyId, choice: match.choice });
		});
		hookArray = uniqBy(hookArray, 'email', 'surveyId');
		hookArray.forEach(({ email, surveyId, choice }) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: { $elemMatch: { email: email, responded: false } }
				},
				{
					$inc: { [choice]: 1 },
					$set: { 'recipients.$.responded': true },
					lastResponded: new Date()
				}
			).exec();
		});
		hookArray = [];
		res.send({});
	});

	app.get('/api/surveys/:surveyId/:vote', (req, res) => {
		res.send('Thanks for your feedback!');
	});
};
