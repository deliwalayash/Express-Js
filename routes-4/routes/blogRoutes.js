const express=require('express')
const router=express.Router()
const users=require('./blogs.js')
const path=require('path')


router.get('/',(req,res)=>{
    res.render('index.ejs',{users:users})
})

router.get('/data',(req,res)=>{
    res.sendFile(path.join(__dirname,'./blogs.js'))
})
router.get('/data/:id',(req,res)=>{
    const id=req.params.id
    const myUser=users.find(i=>i.id == id )
    res.json(myUser)
})
module.exports=router