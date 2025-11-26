const express=require('express')
const app=express()

const port =5000
app.get(('/'),(req,res)=>{
    res.send("<h1>Hello world</h1>")
})

app.get('/api',(req,res,next)=>{
    throw new Error("Server Crashed")
})



app.use((req,res)=>{
    res.status(404)
    res.send("<h1>Page not Found ! 404 Error</h1>")
})

app.use((err,req,res,next)=>{
    console.log(err.message)
    res.status(500)
    res.send("<h1>Error Occured</h1>")
})

app.listen(port,()=>{
    console.log(`Port is listening on ${port}`)
})