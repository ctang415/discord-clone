const express = require('express')
const router = express.Router()
const chat_controller = require('../controllers/chatcontroller')
const message_controller = require('../controllers/messagecontroller')
router.get('/:id', chat_controller.chat_detail)

router.post('/new-chat', chat_controller.chat_create_post)

router.post('/send-message', message_controller.message_create_post)

module.exports = router