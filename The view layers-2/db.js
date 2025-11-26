const mongoose=require('mongoose')

const connectDB=async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/suremarketing")
        console.log("Mongodb connected successfully")
    }
    catch(err){
        console.error("mongodb error",err)
    }
}

module.exports=connectDB