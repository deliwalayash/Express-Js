const express=require('express')
const app=express()
const PORT=9000
const blogs=require('./blogs.js')
const path=require('path')
const router = require('./routes/blogRoutes.js')
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.set('view engine', 'ejs');


app.listen(PORT,()=>{
    console.log(`Port is listening on ${PORT}`)
})