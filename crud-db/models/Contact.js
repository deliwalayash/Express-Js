const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
    name:String,
    email:String,
    mobile:Number
})

module.exports = mongoose.model("Contact",contactSchema)

