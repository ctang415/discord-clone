const User = require('../models/user')
const Friend = require('../models/friend')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const { isValidObjectId } = require('mongoose')

exports.friend_add_post = [
    body('friendUsername', "Username does not exist").custom( async value => {
        const existingUser = await User.findOne( {username: value})
        if (existingUser === null) {
            throw new Error('Username does not exist')
        }
    }),
    body('friendUsername', 'You cannot add yourself.').custom(async (value, {req}) => {
            if (value === req.body.username) {
              throw new Error('You cannot add yourself.')
            }
    }),
    body('friendUsername', 'You are already friends or a friend request has already been sent.').custom(async (value, {req}) => {
        const [user, friendUser] = await Promise.all (
            [
                User.findOne({username: value}),
                User.findOne({username:req.body.username})
            ]
        )
        if (user && friendUser) {
            const existingRequest = await Friend.findOne({recipient: user.id, requester: friendUser.id})
            if (existingRequest !== null) {
                throw new Error('You are already friends or a friend request has been sent')
            }
        }
    }),
    body('friendUsername', 'Username must be between 2-20 characters.').trim().isLength({min: 2, max: 20}).escape(),
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
            const friend = new Friend (
                {
                    recipient: friendUser._id,
                    requester: myUser._id,
                }
            )
            const newFriend = await friend.save()
            const [ user, fUser ] = await Promise.all
            ([ 
                User.findOneAndUpdate({ username: req.body.username}, { $push: { friendsList: newFriend._id} }),
                User.findOneAndUpdate({ username: req.body.friendUsername}, { $push: {friendsList: newFriend._id}})
            ])
            res.status(200).json({success: true})
        }
    })
]

exports.friend_delete_request_post = async (req, res, next) => {
    const [friend, users ] = await Promise.all ([ 
        Friend.findOne({_id: req.body.id}),
        User.find({ 'friendsList': {_id: req.body.id} })
    ])
    if (friend === null || users.length !== 2) {
        res.status(400).json({error: 'Error'})
        return
    }
    await Promise.all( [ 
        User.findByIdAndUpdate(req.body.user, {$pull: { friendsList: req.body.id}}, {new: true}),
        User.findByIdAndUpdate(req.body.friend, {$pull: { friendsList: req.body.id}}, {new: true}),
        Friend.findOneAndDelete({_id: req.body.id})
    ])
    res.status(200).json({success: true})
}

exports.friend_accept_request_post = async ( req, res, next) => {
    const [friend, users ] = await Promise.all ([ 
        Friend.findOne({_id: req.body.id}),
        User.find({ 'friendsList': {_id: req.body.id} })
    ])
    if (friend === null || users.length !== 2) {
        res.status(400).json({error: "Error"})
        return
    }
    await Friend.findOneAndUpdate({_id: req.body.id}, {status: 'Friends'})
    res.status(200).json({success: true})
}

exports.friend_remove_friend_post = async ( req, res, next ) => {
    const [friends, friendRequest ] = await Promise.all ([
        User.find({ 'friendsList': {_id: req.body.id}}),
        Friend.findById(req.body.id)
    ])
        if (friends.length !== 2 || friendRequest === null) {
        res.status(400).json({error: "Error"})
        return
    }
    await Promise.all( [
        User.findByIdAndUpdate(req.body.myUsername, {$pull: {friendsList: req.body.id}}, {new: true}),
        User.findByIdAndUpdate(req.body.myFriend, {$pull: {friendsList: req.body.id}}, {new: true}),
        Friend.findOneAndDelete({_id:req.body.id})
    ])
    res.status(200).json({success:true})
}