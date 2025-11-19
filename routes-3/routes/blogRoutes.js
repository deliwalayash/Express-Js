const express=require('express')
const router=express.Router()
const path=require('path')
let blogs=require('../blogs')
const { title } = require('process')

router.get('/list',(req,res)=>{
    res.sendFile(path.join(__dirname,'../blogs.js'))
})


router.get('/data/:slug',(req,res)=>{
    const slug=req.params.slug

    const myblog=blogs.find((curEle)=>{
        return curEle.slug==slug
    })

    res.render('blogs.ejs',{blog:myblog})
})

router.get('/delete/:slug',(req,res)=>{
    const deleteslug=req.params.slug
    blogs=blogs.filter((curEle)=>{
        return curEle.slug !== deleteslug
    })

    res.redirect('/')

})

router.get('/add-blog',(req,res)=>{
    res.render('form.ejs')
})

router.get('/edit/:slug',(req,res)=>{
    const editblogslug=req.params.slug
    const editblog=blogs.find((i)=>{
        return i.slug ==editblogslug
    })

    res.render('edit.ejs',{blog:editblog})
    
})

router.post('/add-blog',(req,res)=>{
    const newBlog={
        id:blogs.length+1,
        title:req.body.title,
        content:req.body.content,
        slug:req.body.slug
    }

    blogs.push(newBlog)
    res.redirect('/')
})

router.post('/edit-blog/:slug', (req, res) => {
    const oldSlug = req.params.slug;

    // find blog index
    const index = blogs.findIndex((b) => {
        return b.slug === oldSlug;
    });

    // replace old values with new form values
    blogs[index].title = req.body.title;
    blogs[index].slug = req.body.slug;
    blogs[index].content = req.body.content;

    // redirect back home
    res.redirect('/');
});


router.get('/',(req,res)=>{
    res.render('index.ejs',{blogs:blogs})
})

module.exports=router