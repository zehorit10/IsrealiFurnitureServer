

exports.auth = (req, res, next) => {

    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).json({ login: false });
    }
}

exports.employee = (req, res, next) => {
    if ((req.isAuthenticated() && req.user.type == 'employee') || (req.isAuthenticated() && req.user.type == 'manager')) {
        next();
    } else {
        return res.status(403).json({ login: false });
    }
}
exports.maneger = (req, res, next) => {

    if (req.user.type !== 'manager') return res.status(403).json({ login: false });

    next();

}
