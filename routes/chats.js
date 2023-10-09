const express = require('express')
const router = express.Router()
const chat_controller = require('../controllers/chatcontroller')

router.get('/:id', chat_controller.chat_detail)

router.post('/new-chat', chat_controller.chat_create_post)

module.exports = router