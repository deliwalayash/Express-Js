const express=require('express')
const PORT=9000
const app=express()
const path=require('path')
const blogs=require('./blogs')
app.set('view engine', 'ejs');


app.get('/hello',(req,res)=>{
    console.log('hello')
    res.send("hello")
})


app.get('/',(req,res)=>{
    res.render('index.ejs',{blogs:blogs})
})
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'))
})

app.get('/data',(req,res)=>{
    res.json({
        name:"yash",
        id:2,
        course:"fsd"
    })
})
app.get('/blog/:slug',(req,res)=>{
    console.log(req.params.slug)

    const myblog=blogs.find((curEle)=>{
        return curEle.slug == req.params.slug
    })
    if(!myblog){
        res.send("blog not found")
        return
    }
    res.render('blog' ,{blog:myblog})
})
app.listen(PORT,()=>{
    console.log(`Port is listening on ${PORT}`)
})



