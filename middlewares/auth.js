const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {

    let token = req.header("x-API-key");
    if (!token) return res.status(401).json();

    try {
        let verifyToken = jwt.verify(token, "ZEHORIT");
        res.locals.user_id = verifyToken.id;
        res.locals.role = verifyToken.role;
        next();
    } catch (error) {
        return res.status(401).json({ login: false });
    }
}

exports.isAdmin = async (req, res, next) => {
    if (res.locals.role !== "admin") return res.status(401).json({ login: false });
    next();
}

exports.isEmployee = async (req, res, next) => {
    if (res.locals.role == "employee" || res.locals.role == "admin") {
        next();
    } else {
        return res.status(401).json({ login: false });
    }

}


