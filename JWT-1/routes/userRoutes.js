const { json } = require('body-parser')
const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/User')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const isAdmin=require('../middleware/isAdmin')

router.get('/profile', auth, (req, res) => {
    res.json({
        message: "Profile Accessed",
        user: req.user
    })
})

router.get('/admin-dashboard', auth, isAdmin, (req, res) => {
    res.json({
        message: "Welcome Admin!",
        user: req.user
    })
})

router.post('/logout', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})

router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body
    if (!email) {
    return res.status(400).json({
        success: false,
        message: "Email is required"
      })
    }

    const user = await User.findOne({ email })
    if (!user) {
    return res.status(400).json({
        success: false,
        message: "User not found"
    })
    }

    const otp = Math.floor(100000 + Math.random() * 900000)
    const expiry = Date.now() + 5 * 60 * 1000   // 5 minutes

    user.resetOTP = otp
user.resetOTPExpiry = expiry
await user.save()
console.log("Your OTP is:", otp)

return res.status(200).json({
    success: true,
    message: "OTP sent successfully (check console)"
})

        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.post('/reset-password', async (req, res) => {
    try {

      const { email, otp, newPassword } = req.body

    if (!email || !otp || !newPassword) {
    return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required"
    })
  }

  const user = await User.findOne({ email })
if (!user) {
    return res.status(400).json({
        success: false,
        message: "User not found"
    })
}

if (user.resetOTP !== Number(otp)) {
    return res.status(400).json({
        success: false,
        message: "Invalid OTP"
    })
}
if (user.resetOTPExpiry < Date.now()) {
    return res.status(400).json({
        success: false,
        message: "OTP has expired"
    })
}
const hashed = await bcrypt.hash(newPassword, 10)
user.password = hashed
user.resetOTP = null
user.resetOTPExpiry = null
await user.save()
return res.status(200).json({
    success: true,
    message: "Password reset successful"
})

 } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.post('/signup',async(req,res)=>{

  try{

      const {name,email,password}=req.body

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields Are Required"
        })    
    }
    const hashedpassowrd=await bcrypt.hash(password,10)

    const newUser=await User.create({
        name,
        email,
        password:hashedpassowrd
    })

    return res.status(200).json({
        success:true,
        message:"New User Successfully Created",
        Userid:newUser._id
    })


  }catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
    })

  }

})

router.post('/login',async(req,res)=>{

  const {email,password}=req.body || {}

  if(!email || !password){
    return res.status(500).json({
      success:false,
      message:"Email And Password Are required for login"
    })
  }

  const founduser=await User.findOne({email})

  if(! founduser){
    return res.status(400).json({
      success:false,
      message:"Email id does Not match"
    })
  }

  const isMatch= await bcrypt.compare(password,founduser.password)

  if(!isMatch){
    return res.status(400).json({
      success:false,
      message:"Password Do not Match"
    })
  }
  const token= jwt.sign(
    {userID:founduser._id,role:founduser.role},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )

  res.status(200).json({
    success:true,
    message:"Login Successful",
    token:token
  })

})

module.exports = router