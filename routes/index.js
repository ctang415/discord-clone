const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')
const friend_controller = require('../controllers/friendcontroller')
const User = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

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
            const limitedUser = await User.findOneAndUpdate( {email: username}, {online: true}, { 'fields': {password: 0 }})
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
      console.log(id)
      const user = await User.findById(id);
      console.log('DESERIALIZE!!!!')
      done(null, user);
    } catch(err) {
      done(err);
    };
  });

router.get('/', function (req, res, next) {
  console.log(req.user)
})

router.get('/login', (req, res, next) => {
    res.status(200).json('hello')
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info, status) {
      if (err) { return console.log(err) }
      if (!user) { return res.status(400).json({error: info}) }
      req.login(user, function(err) {
        if (err) { return next(err); }
        console.log('is authenticated?: ' + req.isAuthenticated());
        req.user = user;
        return res.status(200).json({ success: true, data: user, id: user})
      })
    })(req, res, next);
})

router.get('/logout', async (req, res, next) => {
})

router.post('/logout', function(req, res, next){
    req.logout( async function(err) {
      if (err) { return next(err); }
        await User.findOneAndUpdate( {email: req.body.username}, {online: false})
        res.status(200).json({success: true})
    });
})

router.get('/register', user_controller.user_create_get)

router.post('/register', user_controller.user_create_post)

router.post('/add-friend', friend_controller.friend_add_post)

module.exports = router