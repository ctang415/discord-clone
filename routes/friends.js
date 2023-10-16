const express = require('express')
const router = express.Router()
const friend_controller = require('../controllers/friendcontroller')

router.post('/', friend_controller.friend_add_post)

router.post('/:friendid', friend_controller.friend_remove_friend_post)

module.exports = router