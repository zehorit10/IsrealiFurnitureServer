var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// const session = require('express-session');
// var passport = require('passport');
// const MongoStore = require('connect-mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');
var productsRouter = require('./routes/products');

// require("./rsa")
var app = express();



app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//     secret: "zehorit",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: 'mongodb+srv://zehorit:0549219058@cluster0.ryk2p.mongodb.net/raitisraeli?retryWrites=true&w=majority' }),
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 6 
//     }
// }));

// require('./middlewares/passport');

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);

module.exports = app;

