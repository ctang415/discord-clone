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
    body('email', 'Email must be between 2-20 characters.').trim().isLength({min: 2, max: 20}).escape(),
    body('username', 'Username must be between 2-20 characters.').trim().isLength({min: 2, max:20}).escape(),
    body('password', 'Password must be at least 2 characters.').trim().isLength({min: 2}).escape(),
    asyncHandler (async (res, req, next) => {
        const errors = validationResult(req)
        const user = new User (
            {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                display_name: req.body.username,
                avatar_url,
            }
        )
        if (!errors.isEmpty()) {
            res.status(404).json({user: user, errors: errors.array()})
            return
        } else {
            await user.save()
            res.status(200).json(user)
        }

    })
]

exports.user_update_get = asyncHandler ( async (req, res, next) => {
    
})

exports.user_update_post

exports.user_delete_get

exports.user_delete_post