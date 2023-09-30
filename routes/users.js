const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')

router.get('/user-detail', user_controller.user_detail)

router.post('/update', user_controller.user_update_post)

router.post('/delete', user_controller.user_delete_post)

module.exports = router