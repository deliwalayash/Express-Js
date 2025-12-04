const express=require('express')
const router= express.Router()
const User = require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

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

router.post('/login',async(req,res)=>{

    try{
        const {email,password}=req.body

        const founduser = await User.findOne({email})
        if(!founduser){
            return res.status(400).json({
                success:false,
                message:"User Not Exist"
            })
        }

        const isMatch=await bcrypt.compare(password,founduser.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Password Do not Match"
            })

        }
        const token=jwt.sign(
            {userId:founduser._id,role:founduser.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        return res.status(200).json({
        success: true,
        message: "Login Successful",
        token: token
        })

    }catch(err){

    }
})

module.exports = router