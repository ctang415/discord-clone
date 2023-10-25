const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')
const friend_controller = require('../controllers/friendcontroller')
const friendsRoute = require('./friends')
const chatsRoute = require('./chats')

router.post('/', user_controller.user_create_post)

const checkLogin = function (req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(400).json({error: 'user not logged in'})
    }
}

router.get('/:userid', checkLogin, user_controller.user_detail)

router.post('/:userid/update', checkLogin, user_controller.user_update_post)

router.post('/:userid/update-more', checkLogin, user_controller.user_update_post_more)

router.post('/:userid/update-password', checkLogin, user_controller.user_update_password_post)

router.post('/:userid/update-email', checkLogin, user_controller.user_update_email_post)

router.post('/:userid/delete', checkLogin, user_controller.user_delete_post)

router.post('/delete-request', checkLogin, friend_controller.friend_delete_request_post)

router.post('/accept-request', checkLogin, friend_controller.friend_accept_request_post)

router.use('/:userid/friends', friendsRoute)

module.exports = router