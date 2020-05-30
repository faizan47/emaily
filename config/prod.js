module.exports = {
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	dbKey: process.env.DB_KEY,
	cookieKey: process.env.COOKIE_KEY
};
console.log(process.env.COOKIE_KEY, process.env.DB_KEY, process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
