const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')
const friend_controller = require('../controllers/friendcontroller')
const User = require('../models/user')
const Friend = require('../models/friend')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const usersRouter = require('./users')

passport.use(
    new LocalStrategy({
        usernameField: 'email',
      }, async( username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
         if (!user) {
            done(new Error('User does not exist'))
          return done(null, false, {message: "User does not exist" } );
        } else {
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            done(new Error('Password does not match'))
          return done(null, false, { message: "Password does not match" });
        } else {
            const limitedUser = await User.findOneAndUpdate( {email: username}, {online: true}, { 'fields': {password: 0 }}).populate([{ path: 'friendsList', populate: { path: 'recipient requester', select: '-password'} }, {path: 'chatsList', populate: [{path: 'users', select: '-password'}, {path: 'messages', populate: {path: 'sender', select: '-password'}}] } ])
            console.log(limitedUser)
            return done(null, limitedUser);
    }
}
      } catch(err) {
        return done(err);
      };
    })
  );

passport.serializeUser(function(user, done) { 
  done(null, user.id);
  });
  
passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });

router.get('/', function (req, res, next) {
  if (!req.user) {
    res.status(400).json({success: false})
    return
  } else {
    res.status(200).json({success:true, user: req.user })
  }
})

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info, status) {
      if (err) { return console.log(err) }
      if (!user) { return res.status(400).json({error: info}) }
      req.login(user, function(err) {
        if (err) { return next(err); }
        console.log('is authenticated?: ' + req.isAuthenticated());
        console.log(user)
        req.user = user;
        return res.status(200).json({ success: true, data: user, id: user})
      })
    })(req, res, next);
})

router.post('/logout', function(req, res, next){
    req.logout( async function(err) {
      if (err) { return next(err); }
      await User.findOneAndUpdate( {email: req.body.username}, {online: false})
        res.status(200).json({success: true})
    });
})


router.use('/users', usersRouter)

module.exports = router