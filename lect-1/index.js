const express=require('express')
const app=express()
const path=require('path')
const port=5000


app.use(express.static(path.join(__dirname,"public")))

app.get('/hello/:name',(req,res)=>{
    res.send("Hello world  " + req.params.name)

})
app.get('/about',(req,res)=>{
    res.send("<h1>I am about section</h1>")
})
app.get('/contact',(req,res)=>{
    res.send("<h1>I am contact section</h1>")
})
app.get('/blog',(req,res)=>{
    res.send("<h1>I am Blog section</h1>")
})

app.get('/yash',(req,res)=>{
    res.sendFile(path.join(__dirname,'yash.html'))
})
app.get('/hi',(req,res)=>{
    res.json({"yash":35})
})
app.get('/why',(req,res)=>{
    res.json({"foram":32})
})

app.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})