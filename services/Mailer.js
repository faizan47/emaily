const { SendGridKey } = require('../config/keys');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SendGridKey);

const sendEmail = async ({ subject, recipients }, html) => {
	const msg = {
		to: recipients,
		from: 'no-reply@emaily.com',
		subject,
		html
	};
	await sgMail.sendMultiple(msg);
};

module.exports = sendEmail;
