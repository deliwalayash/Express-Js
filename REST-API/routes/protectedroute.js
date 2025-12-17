const express= require('express')
const route=express.Router()
const auth = require('../middleware/auth')

route.get('/profile',auth,(req,res)=>{
    res.json({
        success:true,
        user:req.user
    })
})

module.exports = route