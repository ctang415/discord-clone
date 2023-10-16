require('dotenv').config()
const mongoose = require('mongoose');
var createError = require('http-errors');
const express = require('express')
var cookieParser = require('cookie-parser');
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const chatsRouter = require('./routes/chats')
const User = require ('./models/user')

mongoose.connect(`${process.env.mongodb}`, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.use(express.json());
app.use(cors(
  { 
    origin: true, 
    credentials:true,    
  }
  ));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({  secret: `${process.env.secret}`, resave: false, saveUninitialized: true }));
app.use(passport.initialize()); 
app.use(passport.session())


app.use('/', indexRouter)
  
app.listen('3000', () => {
    console.log('Now listening on port 3000')
})

module.exports = app