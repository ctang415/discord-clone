const express = require('express')
const router = express.Router()
const message_controller = require('../controllers/messagecontroller')

router.post('/:messageid')

module.exports = router