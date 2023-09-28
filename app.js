require('dotenv').config()
const mongoose = require('mongoose');
var createError = require('http-errors');
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

mongoose.connect(`${process.env.mongodb}`, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(session({ secret: `${process.env.secret}`, resave: false, saveUninitialized: true }));
app.use(passport.initialize()); 
app.use(passport.authenticate('session'));
app.use(passport.session())


app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use(function(req, res, next) {
    res.locals.user = req.user || null;
    console.log(res.locals.user)
    next();
  });

  
app.listen('3000', () => {
    console.log('Now listening on port 3000')
})

module.exports = app