const express=require('express')
const route=express.Router()
const {signUp,login}= require('../controllers/authController')

route.post('/signUp',signUp)
route.post('/login',login)

module.exports = route