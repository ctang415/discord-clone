const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const { isValidObjectId } = require('mongoose')
const bcrypt = require('bcryptjs')

exports.user_detail = asyncHandler ( async (req, res, next) => {
    if (req.user) {
    const user = await User.findById(req.user.id).populate([{ path: 'friendsList', populate: { path: 'recipient requester', select: '-password'} }, { path: 'chatsList', populate: [{ path: 'users', select: '-password'}, {path: 'messages', populate: {path: 'sender', select: '-password'}}]} ])
    console.log(user)
    console.log(req)
    console.log('user detail end')
    if (isValidObjectId(req.user.id) === false) {
        res.status(404).json({error: "User does not exist"})
        return
    }
    if (user === null) {
        res.status(404).json({error: "User not found"})
        return
    }
    if (req.params.userid !== req.user.id) {
        const friendUser = await User.findById(req.params.userid).select('-password')
        res.status(200).json({user_detail: friendUser})
    } else {
        res.status(200).json({user_detail: user})
    }
    } else {
    console.log('not logged in')
}
})

exports.user_create_get = asyncHandler ( async (req, res, next) => {
    res.status(200).json()
})

exports.user_create_post = [
    body('email', "Email already exists").custom( async value => {
        const existingUser = await User.findOne( {email: value})
        if (existingUser) {
            throw new Error('Email already exists')
        }
    }),
    body('username', 'Username already exists').custom( async value => {
        const existingUser = await User.findOne( {username: value})
        if (existingUser) {
            throw new Error('User already exists')
        }
    }),
    body('email', 'Email must be between 2-20 characters.').trim().isLength({min: 2, max: 20}).escape(),
    body('username', 'Username must be between 2-20 characters.').trim().isLength({min: 2, max:20}).escape(),
    body('password', 'Password must be at least 2 characters.').trim().isLength({min: 2}).escape(),
    asyncHandler (async (req, res, next) => {
        try {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return err
            }   
        const errors = validationResult(req)
        const user = new User (
            {
                email: req.body.email,
                username: req.body.username,
                password: hash,
                display_name: req.body.username,
                avatar_url: req.body.avatar
            }
        )
        if (!errors.isEmpty()) {
            res.status(400).json({user: user, errors: errors.array()})
            return
        } else {
            await user.save()
            res.status(200).json(user)
        }
        })
    } catch (err) {
        return next(err) 
    }
    })
]
/*
exports.user_update_post = async function (req, res, next) {
    if (req.body.about_me || req.body.display_name) { 
        const signupValidation = () => {
        return [
                body('display_name', 'Display name must be between 1-20 characters.').trim().isLength({min: 1, max: 2}).escape(),
            body('about_me', 'About me cannot exceed 100 characters.').trim().isLength({max: 100}).escape(),
            ]
        }
    const check = asyncHandler (async ()=> {
    console.log(req.body)
        const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return
    }
        const newUser = await User.findByIdAndUpdate(req.body.id, 
        {display_name: req.body.display_name, about_me: req.body.about_me,})
        res.status(200).json({ user: newUser})
    })

    const validateBody = () => {
        [
        body('display_name', 'Display name must be between 1-20 characters.').trim().isLength({min: 1, max: 2}).escape(),
        body('about_me', 'About me cannot exceed 100 characters.').trim().isLength({max: 100}).escape(),
        check()  
        ]    
    }
    validateBody()

} else if (req.body.newPassword) { 
    console.log('new password')
    
    body('password', 'Password does not match').custom( async (value, {req}) => {
        const user = await User.findOne({_id: req.body.id})
        try {
          const match = await bcrypt.compare(value, user.password)
          if (!match) {
            throw new Error('Password is incorrect')
          }
        } catch(err) {
          throw new Error(err)
    }
}),   
    body('confirmPassword', 'Please confirm your password.').custom((value, { req }) => {
      return value === req.body.newPassword;
    }),
    body('newPassword', 'Password must be at least 2 characters.').trim().isLength({min: 2}).escape(),
    asyncHandler( async (req, res, next) => {
        try {
            bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
            if (err) {
                return err
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({errors: errors.array()})
                return
            } else {
                const newUser = await User.findByIdAndUpdate(req.body.id, {password: hash})
                res.status(200).json({user: newUser})
            }
            })
        } catch(err) {
        throw new Error(err)
        }
    })
 } else if (req.body.email) {
    console.log( 'email')
    [
    body('password', 'Password does not match').custom( async (value, {req}) => {
        const user = await User.findOne({_id: req.body.id})
        try {
          const match = await bcrypt.compare(value, user.password)
          if (!match) {
            throw new Error('Password is incorrect')
          }
        } catch(err) {
          throw new Error(err)
    }
}),   
    body('email', "Email already exists").custom( async value => {
        const existingUser = await User.findOne( {email: value})
        if (existingUser) {
            throw new Error('Email already exists')
        }
    }),
    body('confirmPassword', 'Please confirm your password.').custom((value, { req }) => {
        return value === req.body.password;
      }),
      asyncHandler( async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
            return
        } else {
            const newUser = await User.findByIdAndUpdate(req.body.id, {email : req.body.email})
            res.status(200).json({user: newUser})
        }
      })
    ]
} else if (req.body.password && req.body.username) {
    [
    console.log('new username'),
    body('username', "Username already exists").custom( async value => {
        console.log('test username exists')
        const existingUser = await User.findOne( {username: value})
        if (existingUser) {
            throw new Error('Username already exists. Please choose another one.')
        }
    }),
    console.log(req.body),
    body('password', 'Password does not match').custom( async (value, {req}) => {
        console.log('password not match test')
        const user = await User.findOne({_id: req.body.id})
        try {
          const match = await bcrypt.compare(value, user.password)
          if (!match) {
            throw new Error('Password is incorrect')
          }
        } catch(err) {
          throw new Error(err)
    }
}),
    body('username', 'Username must be between 2-20 characters.').trim().isLength({min: 2, max:20}).escape(),
    asyncHandler ( async (req, res, next) => {
        console.log('async new user')
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array()})
            return
        } else {
            const newUser = await User.findOneAndUpdate( {_id: req.body.id}, {username: req.body.username})
            res.status(200).json({ user: newUser})
        }
    })
]
} else { 
    const user = await User.findById(req.body.id)
    if (!user) {
        res.status(400).json({error: 'User does not exist'})
        return
    } else {
        await User.findByIdAndRemove(req.body.id)
        res.status(200).json({success: true})
    }
}
}
*/


exports.user_update_post = [
    body('username', "Username already exists").custom( async value => {
        const existingUser = await User.findOne( {username: value})
        if (existingUser) {
            throw new Error('Username already exists. Please choose another one.')
        }
    }),
    body('password', 'Password does not match').custom( async (value, {req}) => {
        const user = await User.findOne({_id: req.body.id})
        try {
          const match = await bcrypt.compare(value, user.password)
          if (!match) {
            throw new Error('Password is incorrect')
          }
        } catch(err) {
          throw new Error(err)
    }
}),
    body('username', 'Username must be between 2-20 characters.').trim().isLength({min: 2, max:20}).escape(),
    asyncHandler ( async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array()})
            return
        } else {
            const newUser = await User.findOneAndUpdate( {_id: req.body.id}, {username: req.body.username})
            res.status(200).json({ user: newUser})
        }
    })
]


exports.user_update_post_more = [
    body('display_name', 'Display name must be between 1-20 characters.').trim().isLength({min: 1, max: 20}).escape(),
    body('about_me', 'About me cannot exceed 100 characters.').trim().isLength({max: 100}).escape(),
    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
            return
        } else {
            const newUser = await User.findByIdAndUpdate(req.body.id, 
                {display_name: req.body.display_name, about_me: req.body.about_me,})
            res.status(200).json({ user: newUser})
        }
    })
]

exports.user_update_password_post = [
    body('password', 'Password does not match').custom( async (value, {req}) => {
        const user = await User.findOne({_id: req.body.id})
        try {
          const match = await bcrypt.compare(value, user.password)
          if (!match) {
            throw new Error('Password is incorrect')
          }
        } catch(err) {
          throw new Error(err)
    }
}),   
    body('confirmPassword', 'Please confirm your password.').custom((value, { req }) => {
      return value === req.body.newPassword;
    }),
    body('newPassword', 'Password must be at least 2 characters.').trim().isLength({min: 2}).escape(),
    body('newPassword', 'Please choose a new password.').custom( async (value, {req}) => {
        const user = await User.findOne({_id: req.body.id})
        try {
          const match = await bcrypt.compare(value, user.password)
          if (match) {
            throw new Error('Please choose a new password.')
          }
        } catch(err) {
          throw new Error(err)
    }
}),
    asyncHandler( async (req, res, next) => {
        try {
            bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
            if (err) {
                return err
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({errors: errors.array()})
                return
            } else {
                const newUser = await User.findByIdAndUpdate(req.body.id, {password: hash})
                res.status(200).json({user: newUser})
            }
            })
        } catch(err) {
        throw new Error(err)
        }
    })
]

exports.user_update_email_post = [
    body('password', 'Password does not match').custom( async (value, {req}) => {
        const user = await User.findOne({_id: req.body.id})
        try {
          const match = await bcrypt.compare(value, user.password)
          if (!match) {
            throw new Error('Password is incorrect')
          }
        } catch(err) {
          throw new Error(err)
    }
}),   
    body('email', "Email already exists").custom( async value => {
        const existingUser = await User.findOne( {email: value})
        if (existingUser) {
            throw new Error('Email already exists')
        }
    }),
    body('confirmPassword', 'Please confirm your password.').custom((value, { req }) => {
        return value === req.body.password;
      }),
      asyncHandler( async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
            return
        } else {
            const newUser = await User.findByIdAndUpdate(req.body.id, {email : req.body.email})
            res.status(200).json({user: newUser})
        }
      })
]

exports.user_delete_post = async (req, res, next ) => {
    const user = await User.findById(req.body.id).exec()
    if (!user) {
        res.status(400).json({error: 'User does not exist'})
        return
    } else {
        await User.findByIdAndRemove(req.body.id)
        res.status(200).json({success: true})
    }
}
