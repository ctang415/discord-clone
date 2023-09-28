const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')


router.post('/update', user_controller.user_update_post)

module.exports = router