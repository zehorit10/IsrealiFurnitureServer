var express = require('express');
var userController = require('../controllers/user');
var { isAuth } = require('../middlewares/auth');

var router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.create);
router.get("/auth", isAuth, (req, res) => {
    res.json({
        isAuth: true,
        role: res.locals.role
    })
});

module.exports = router;
