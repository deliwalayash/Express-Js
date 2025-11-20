const express=require('express')
const PORT=9000
const app=express()
const router=require('./routes/blogRoutes.js')

app.use(router)

app.listen(PORT,()=>{
    console.log(`Port is listening to ${PORT}`)
})



