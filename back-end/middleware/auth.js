require('dotenv').config();
const jsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;
        req.auth = { userId, userRole };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid User Id'
        } else { next(); }
    }
    catch {
        res.status(401).json({ error: new Error('Invalid request')});
    }
}