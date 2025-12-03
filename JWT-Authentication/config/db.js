const mongoose=require('mongoose')

const dbConnect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo Connected")
    }catch(err){
        console.log("Error",err.message)
    }
}

module.exports = dbConnect

