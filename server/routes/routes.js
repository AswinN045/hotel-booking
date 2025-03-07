const express = require('express')
const controller = require('../controller/controller')

const router = express.Router();

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/book-hotel', controller.bookHotel)



module.exports = router