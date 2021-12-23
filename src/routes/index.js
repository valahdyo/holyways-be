const express = require('express')

const router = express.Router()

//Controller
const { loginUser, addUser } = require('../controllers/user')
const { getFunds } = require('../controllers/fund')

//Route
router.post('/login', loginUser)
router.post('/register', addUser)

router.get('/funds', getFunds)


module.exports = router