const express = require('express')

const router = express.Router()

//Controller
const { loginUser, addUser, getUsers, deleteUser } = require('../controllers/user')
const { getFunds, getFund, addFund, updateFund, deleteFund, updateUserDonate } = require('../controllers/fund')

//Route
router.get('/users', getUsers)
router.post('/login', loginUser)
router.post('/register', addUser)
router.delete('/user/:id', deleteUser)

router.get('/funds', getFunds)
router.get('/fund/:id', getFund)
router.post('/fund', addFund)
router.patch('/fund/:id', updateFund)
router.patch('/fund/:idFund/:idUser', updateUserDonate)
router.delete('/fund/:id', deleteFund)

module.exports = router