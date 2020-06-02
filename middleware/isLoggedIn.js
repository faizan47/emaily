module.exports = (req, res, next) => {
	if (!req.user) res.status(401).send({ message: 'User not authorized' });
	next();
};
