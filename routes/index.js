var express = require('express');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');
var generate = require('generate-password');
var userController = require('../controllers/user');
var { isAuth } = require('../middlewares/auth');

var router = express.Router();

// user: 'IsrealiFurniture@outlook.co.il',
//                 pass: 'Aa242424!'

router.post("/login", userController.login);
router.post("/register", userController.create);
router.get("/auth", isAuth, (req, res) => {
    res.json({
        isAuth: true,
        role: res.locals.role
    })
});
router.get("/key", (req, res) => {
    let private = fs.readFileSync(path.join(__dirname, '../keys/private.pem'), 'utf8');
    res.json({ key: private })
})

router.post("/reset-password", async function (req, res, next) {
    let data = await userController.getByEmail(req.body.email);
    if (data) {
        var newPassword = generate.generate({
            length: 8,
            numbers: true,
            symbols: false,
            lowercase: false,
            uppercase: false,
            strict: true,
        });

        // create transporter object with smtp server details
        var transporter = nodemailer.createTransport({
            service: 'Outlook',
            // port: 2525,
            auth: {
                user: 'shugipro@outlook.co.il',
                pass: 'mother2022'
            },
            secure: false,
            host: 'smtp-mail.outlock.com'
        });

        var mailOptions = {
            from: 'shugipro@outlook.co.il',
            // to: req.user.mail,
            to: `${data.email}`,
            subject: 'Reset Password',
            text: `סיסמתך החדשה היא:
            ${newPassword}`
        };

        let changePassword = await userController.changePassword(req.body.email, newPassword);
        console.log(changePassword);
        if(!changePassword) return res.status(400).send("error");
        // res.json({ success: true, error: false, newPassword: newPassword })
        // send email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ success: false, error: true, newPassword: newPassword })
            } else {
                res.json({ success: true, error: false })
            }
        });
    }
});



module.exports = router;
