const express=require('express')
const router = express.Router();

const blogs=require('../blogs.js')
const path=require('path')


router.get('/',(req,res)=>{
    res.render('index.ejs',{blogs:blogs})
})

router.get('/json',(req,res)=>{
    res.json({name:"yash",id:3,course:"fullstack"})
})

router.get('/data',(req,res)=>{
    res.sendFile(path.join(__dirname,'../blogs.js'))
})

router.get('/add-blog',(req,res)=>{
    res.render('form')
})

router.post('/add-blog',(req,res)=>{
    const newBlog={
        id:blogs.length+1,
        title:req.body.title,
        slug:req.body.slug,
        content:req.body.content
    }
    blogs.push(newBlog)
    res.redirect('/')
})

router.get('/delete/:slug',(req,res)=>{
    let deleteslug=req.params.slug

    let deletedBlog=blogs.findIndex((curEle)=>{
        return curEle.slug == deleteslug 
    })

    let index=deletedBlog.id

    blogs.splice(index,1)

    res.redirect('/')
})

router.get('/blog/:slug',(req,res)=>{
    const myblog=blogs.find((curEle)=>{
        return curEle.slug == req.params.slug
    })

    res.render('blog',{blog:myblog})
})

module.exports=router