const User = require('../models/user')
const Chat = require('../models/chat')
const asyncHandler = require('express-async-handler')

exports.chat_detail = asyncHandler ( async (req, res, next ) => {
    let path = req.baseUrl.split('/friends')
    const chat = await Chat.findOne({users: {$all: [ path[1].split('/chats')[0].split('/')[1], req.user.id] }}).populate( {path: 'messages', populate: {path:'sender'} })
    console.log(path)
    if (chat === null) {
        res.status(400).json({error: 'Chat does not exist'})
        return
    }
    res.status(200).json({chat: chat})
})

exports.chat_create_post = asyncHandler ( async (req, res, next ) => {
    const chat = new Chat (
        {
            users: [req.body.user, req.body.friend]
        }
    )

    const chatRoom = await chat.save()
    const [ user, friendUser ] = await Promise.all(
        [
            User.findByIdAndUpdate(req.body.user, { $push: { chatsList: chatRoom._id} }),
            User.findByIdAndUpdate(req.body.friend, { $push: { chatsList: chatRoom._id} })
        ]
    )
    res.status(200).json({chat: chat})
})