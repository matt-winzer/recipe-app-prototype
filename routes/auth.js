const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth')

router.post('/register', controller.registerUser)
router.post('/login', controller.loginUser)

module.exports = router