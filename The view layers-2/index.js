const express=require('express')
const app=express()
const port = 4000
const router=require('./routes/blogroutes')
app.use(express.static("public"))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
const connectDB=require('./db')

connectDB()

app.use(router)

app.listen(port,()=>{
    console.log(`Port is listening to ${port}`)
})
