const express=require('express')
const path =require('path')
const router=express.Router()

const blogs=require('../data/blogs')


router.get('/',(req,res)=>{
    //  res.sendFile(path.join(__dirname,'../templates/index.html'))
    res.render('home')
})
router.get('/blog',(req,res)=>{
    //  res.sendFile(path.join(__dirname,'../templates/index.html'))
    res.render('./blogHome',{
        blogs
    })
})

router.get('/blog/:slug',(req,res)=>{
    const blog = blogs.filter((e)=>{
        return e.slug==req.params.slug
    })
    res.send(blog)
})

module.exports = router
