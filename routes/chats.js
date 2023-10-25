const express = require('express')
const router = express.Router()
const chat_controller = require('../controllers/chatcontroller')
const message_controller = require('../controllers/messagecontroller')
const messagesRoute = require('./messages')

const checkLogin = function (req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(400).json({error: 'user not logged in'})
    }
}

router.get('/', checkLogin, chat_controller.chat_detail)

router.post('/', checkLogin, chat_controller.chat_create_post)

router.use('/messages', messagesRoute)

module.exports = router