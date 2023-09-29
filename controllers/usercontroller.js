const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const { isValidObjectId } = require('mongoose')
const bcrypt = require('bcryptjs')

exports.user_detail = asyncHandler ( async (req, res, next) => {
    const [ user, limitedUser ] = await Promise.all (
        [ 
            User.findById(req.params.id).populate('chats', 'friends').exec(),
            User.findById(req.params.id).select("-email", "-password", "-friends", "-chats").exec()
        ]
        )
        /*
        // if logged in
        if (req.user) {

        }
        */
    if (isValidObjectId(req.params.id) === false) {
        res.status(404).json({error: "User does not exist"})
        return
    }
    if (user === null) {
        res.status(404).json({error: "User not found"})
        return
    }
    if (req.params.id === req.user) {
        res.status(200).json({user_detail: user})
    } else {
        res.status(200).json({user_detail: limitedUser})
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

exports.user_update_get = asyncHandler ( async (req, res, next) => {
    
})

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

exports.user_delete_get

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