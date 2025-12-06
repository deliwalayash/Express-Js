const mongoose=require('mongoose')


const userScmema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    },
    resetOTP: Number,
    resetOTPExpiry: Date
})

module.exports = mongoose.model("User",userScmema)