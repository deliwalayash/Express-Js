const express=require('express')
const app=express()
const PORT=4000


require("dotenv").config()
const DBConnect=require('./config/db')
DBConnect()
app.use(express.json())
const authRoute=require('./routes/authRoutes')
app.use('/api/auth',authRoute)


app.listen(PORT,()=>{
    console.log(`Port is listening to ${PORT}`)
})