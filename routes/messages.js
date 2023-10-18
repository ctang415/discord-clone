const express = require('express')
const router = express.Router()
const message_controller = require('../controllers/messagecontroller')

router.post('/', message_controller.message_create_post)

router.post('/:messageid', message_controller.message_update_post)

router.post('/:messageid/remove', message_controller.message_delete_post)

module.exports = router