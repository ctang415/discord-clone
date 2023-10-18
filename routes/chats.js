const express = require('express')
const router = express.Router()
const chat_controller = require('../controllers/chatcontroller')
const message_controller = require('../controllers/messagecontroller')
const messagesRoute = require('./messages')

router.get('/', chat_controller.chat_detail)

router.post('/', chat_controller.chat_create_post)
//router.post('/new-chat', chat_controller.chat_create_post)

//router.post('/send-message', message_controller.message_create_post)

router.use('/messages', messagesRoute)

module.exports = router