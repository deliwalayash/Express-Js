const express=require('express')
const router= express.Router()
const User = require('../models/User')
const bcrypt=require('bcrypt')


router.post('/signup',async(req,res)=>{
    try{

        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }

        const hashedpassword=await bcrypt.hash(password,10)

        const newUser= await User.create({
            name,
            email,
            password:hashedpassword
        })

        return res.status(200).json({
            success:true,
            message:"User registerd Successfully",
            userId:newUser._id
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })

    }
})

module.exports = router