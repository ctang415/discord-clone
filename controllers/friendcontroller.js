const User = require('../models/user')
const Friend = require('../models/friend')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const { isValidObjectId } = require('mongoose')

exports.friend_add_post = [
    body('friendUsername', 'You cannot add yourself.').custom(async (value, {req}) => {
            if (value === req.body.username) {
                throw new Error('You cannot add yourself.')
        }
    }),
    body('friendUsername', "Username does not exist").custom( async value => {
        const existingUser = await User.findOne( {username: value})
        if (existingUser === null) {
            throw new Error('Username does not exist.')
        }
    }),
    body('friendUsername', 'Username must be between 2-20 characters.').trim().isLength({min: 2}).isLength({max: 20}).escape(),
    asyncHandler (async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.status(400).json({errors: errors.array()})
            return
        } else {
            const [myUser, friendUser] = await Promise.all ([
                User.findOne( {username: req.body.username}),
                User.findOne({ username: req.body.friendUsername})
            ])
            console.log(myUser)
            console.log(friendUser)
            const friend = new Friend (
                {
                    recipient: myUser.id,
                    requester: friendUser.id,
                }
            )
            await friend.save()
            res.status(200).json({success: true})
        }
    })
]