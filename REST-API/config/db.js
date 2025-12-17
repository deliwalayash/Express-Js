const mongoose=require('mongoose')

const dbConnect = async()=>{
    try{    
        await mongoose.connect(process.env.MONGO)
        console.log("Mongodb database connected")
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }

}

module.exports=dbConnect