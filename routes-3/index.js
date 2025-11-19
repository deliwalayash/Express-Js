const express=require('express')
const PORT=8000
const app=express()
const router=require('./routes/blogRoutes')

app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(PORT ,()=>{
    console.log(`post is listening to ${PORT}`)
})


