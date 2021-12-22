const express = require('express')

const router = express.Router()

//Controller
const { loginUser} = require('../controllers/user')

//Route
router.post('/login', loginUser)


module.exports = router