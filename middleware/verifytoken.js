const jwt = require('jsonwebtoken')
const dbConfig = require("./db.config");

module.exports = function(req,res,next){
    const token = req.body.token || req.query.token || req.header('auth-token')
    if (!token) return res.status(401).send('access denied')

    try {
        const verified = jwt.verify(token, dbConfig.secret)
        req.user = verified;
        next();

    } catch (err) {
        res.status(400).send('Invalid token')

    }

}