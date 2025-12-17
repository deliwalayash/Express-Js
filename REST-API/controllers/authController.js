const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signUp= async(req,res)=>{

    try{
        const {name,email,password}= req.body

        if(!name || !email || !password){
            return res.status(500).json({
                success:false,
                message:"All fields Must required"
            })
        }

        const existingUser=await User.findOne({email})

        if(existingUser){

            return res.status(500).json({
                success:false,
                message:"User Already Exist"
            })
        }

        const hashedpassword=await bcrypt.hash(password,10)

        const user=await User.create({
            name,
            email,
            password:hashedpassword
        })

        res.status(201).json({
            success:true,
            message:"User Succesfully created"
        })

    }
    catch(err){
        res.status(500).json({
            success:true,
            message:err.message
        })

    }
}

const login = async(req,res)=>{
    try{

        const {email,password}=req.body
        if(!email || !password){
            return res.status(500).json({
                success:false,
                message:"All fiedl must required"
            })
        }

        const user=await User.findOne({email})

        if(!user){
            return res.status(500).json({
                success:false,
                message:"User not found"
            })

        }
        console.log(user)

        const isMatching=await bcrypt.compare(password,user.password)

        if(!isMatching){
            return res.status(500).json({
                success:false,
                message:"Password do not match"
            })
        }
        
        const token=jwt.sign(
            {userid:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1D"}
        )

        res.status(200).json({
            success:true,
            token
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}

module.exports = {signUp ,login}