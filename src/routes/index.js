const express = require('express')

const router = express.Router()

//Controller
const { loginUser, addUser } = require('../controllers/user')

//Route
router.post('/login', loginUser)
router.post('/register', addUser)


module.exports = router