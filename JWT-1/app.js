const express=require('express')
const app=express()
require('dotenv').config()


const dbconnect=require('./db/dbconnect')
dbconnect()
const router=require('./routes/userRoutes')
app.use(express.json())
app.use('/api/auth',router)

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running `)
})
