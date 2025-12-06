const mongoose=require('mongoose')

const dbconnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb Connect")
    }
    catch(err)
    {
        console.log("Error",err.message)
    }
}

module.exports = dbconnect