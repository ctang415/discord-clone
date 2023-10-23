const express = require('express')
const router = express.Router()
const message_controller = require('../controllers/messagecontroller')

const checkLogin = function (req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(400).json({error: 'user not logged in'})
    }
}


router.post('/', checkLogin, message_controller.message_create_post)

router.post('/:messageid', checkLogin, message_controller.message_update_post)

router.post('/:messageid/delete', checkLogin, message_controller.message_delete_post)

module.exports = router