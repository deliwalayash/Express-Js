const express=require('express')
const app=express()

const dotenv=require('dotenv')
dotenv.config()
const dbConnect=require('./config/db')
dbConnect()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const authroute=require('./routes/authroutes')
const protectedroute=require('./routes/protectedroute')

app.use('/api/auth', authroute)
app.use('/api', protectedroute)

const PORT= process.env.PORT || 4000

app.get('/',(req,res)=>{
    res.send("Api is running")
})

app.listen(PORT,()=>{
    console.log("Server is Running on Port 4000")
})