const express=require('express')
const app=express()
const PORT=4000

require("dotenv").config()
const DBConnect=require('./config/db')
DBConnect()
app.get('/',(req,res)=>{
    res.send("<h1>hello world</h1>")
})

app.listen(process.env.PORT,()=>{
    console.log(`Port is listening to ${PORT}`)
})