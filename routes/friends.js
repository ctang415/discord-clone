const express = require('express')
const router = express.Router()
const friend_controller = require('../controllers/friendcontroller')
const chatsRoute = require('./chats')

const checkLogin = function (req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(400).json({error: 'user not logged in'})
    }
}


router.post('/', checkLogin, friend_controller.friend_add_post)

router.post('/:friendid', checkLogin, friend_controller.friend_remove_friend_post)

router.use('/:friendid/chats', chatsRoute)

module.exports = router