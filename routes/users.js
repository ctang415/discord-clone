const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')
const friend_controller = require('../controllers/friendcontroller')

router.get('/user-detail', user_controller.user_detail)

router.post('/update', user_controller.user_update_post)

router.post('/update-more', user_controller.user_update_post_more)

router.post('/update-password', user_controller.user_update_password_post)

router.post('/update-email', user_controller.user_update_email_post)

router.post('/delete', user_controller.user_delete_post)

router.post('/delete-request', friend_controller.friend_delete_request_post)

router.post('/accept-request', friend_controller.friend_accept_request_post)

router.post('/remove-friend', friend_controller.friend_remove_friend_post)

module.exports = router