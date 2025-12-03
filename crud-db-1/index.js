const PORT = 5000
const express=require('express')
const app=express()
const routes=require('./routes/contactRoutes')
app.set("view engine","ejs")
const mongoose=require('mongoose')
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/test")

app.use(routes)


app.listen(PORT,()=>{
    console.log(`Port is listening to ${PORT}`)
})