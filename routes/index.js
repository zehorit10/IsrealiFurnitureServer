var express = require('express');
var passport = require('passport');

var router = express.Router();

router.post("/login",
  (req, res, next) => {
    console.log("req.body: ", req.body);
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    if (req.user) {
      res.json({
        isAuth: true,
        role: req.user.role
      })
    } else {
      res.status(401).json({
        isAuth: false,
      })
    }
  });

module.exports = router;
