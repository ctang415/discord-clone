const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Message = require('../models/message')
const Chat = require('../models/chat')

exports.message_create_post = [
    body('message', 'Message must not be blank').trim().isLength({min: 1}).escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const message = new Message (
            {
                sender: req.body.sender,
                message: req.body.message
            }
        )
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
            return
        } else {
            console.log('hi')
console.log(req.user.id)
            const newMessage = await message.save()
            const chat = await Chat.findOneAndUpdate({users: {$all: [ req.body.friend, req.user.id] }}, {$push: {messages: newMessage._id}})
            res.status(200).json({success: true, message: message, chat: chat})
        }
    })
]