const express=require('express')
const router= express.Router()
const User = require('../models/User')

router.post('/signup',async(req,res)=>{
    try{

        const {name,email,password}=req.body
        if(!name || !email || !password){
            return r
        }
    }
})