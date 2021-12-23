const express = require('express')

const router = express.Router()

//Controller
const { loginUser, addUser, getUsers, deleteUser } = require('../controllers/user')

//Route
router.get('/users', getUsers)
router.post('/login', loginUser)
router.post('/register', addUser)
router.delete('/user/:id', deleteUser)


module.exports = router