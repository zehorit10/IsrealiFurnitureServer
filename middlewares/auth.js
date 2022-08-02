const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {

    let token = req.header("x-API-key");
    if(!token) return res.status(401).json();
    
    try {
        let verifyToken = jwt.verify(token, "ZEHORIT");
        res.locals.user_id = verifyToken.id;
        next();
    } catch (error) {
        return res.status(401).json({ login: false });
    }
}

