const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')

router.get('/login')

router.post('/login')

router.get('/logout')

router.post('/logout')

router.get('/register', user_controller.user_create_get)

router.post('/register', user_controller.user_create_post)

module.exports = router